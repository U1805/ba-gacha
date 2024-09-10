import requests
import json
import logging
import re

# name fixing table
FIX_KIVO_NAME = {
    "ミク": "初音ミク",
    "美琴": "御坂美琴",
    "操祈": "食蜂操祈",
    "涙子": "佐天涙子",
}
FIX_KIVO_SKIN = {"骑行服": "骑行", "私服": "便服", "体育服": "运动服"}

errors = []


# ANSI color codes
class Colors:
    RESET = "\033[0m"
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    MAGENTA = "\033[95m"
    CYAN = "\033[96m"


# Custom logger class with colors and emojis
class ColoredLogger(logging.Logger):
    def __init__(self, name):
        super().__init__(name)

    def info(self, msg, *args, **kwargs):
        super().info(f"{Colors.GREEN} {msg}{Colors.RESET}", *args, **kwargs)

    def warning(self, msg, *args, **kwargs):
        super().warning(f"{Colors.YELLOW} ⚠️  {msg}{Colors.RESET}", *args, **kwargs)

    def error(self, msg, *args, **kwargs):
        super().error(f"{Colors.RED}❌ {msg}{Colors.RESET}", *args, **kwargs)

    def success(self, msg, *args, **kwargs):
        self.info(f"{Colors.CYAN}✨ {msg}{Colors.RESET}", *args, **kwargs)


# Configure logging
logging.setLoggerClass(ColoredLogger)
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)


class BlueRequest:
    def request_schale_list(self, lng="jp"):
        url = f"https://schaledb.com/data/{lng}/students.min.json"
        response = requests.get(url)
        if response.status_code != 200:
            logger.error(
                f"Failed to get SchaleDB student list, status code: {response.status_code}"
            )
            raise Exception("Failed to get SchaleDB student list")
        return response.json()

    def request_kivo(self, url):
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception("Fail to request data")
        data = response.json()
        if data["code"] != 2000:
            raise Exception(f"Fail to response, codename {data['codename']}")
        return data["data"]

    def request_kivo_list(self):
        url = "https://api.kivo.fun/api/v1/data/students/?page=1&page_size=5000&name="
        data = self.request_kivo(url)
        return data["students"]

    def request_kivo_data(self, id):
        url = f"https://api.kivo.fun/api/v1/data/students/{id}"
        return self.request_kivo(url)


class Schale:
    def __init__(self) -> None:
        self.ba = BlueRequest()

    @property
    def student_list(self):
        return self.ba.request_schale_list("zh")

    def get_list(self):
        res_jp = self.ba.request_schale_list("jp")
        res_zh = self.ba.request_schale_list("zh")

        student_list = {}
        for key in res_jp:
            jp_name = res_jp[key]["Name"]
            zh_name = res_zh[key]["Name"]

            student_name = jp_name
            pattern = r"(.*?)（(.*)）"
            if re.search(pattern, zh_name):
                name = re.search(pattern, jp_name).group(1)
                skin = re.search(pattern, zh_name).group(2)
                student_name = f"{name}（{skin}）"

            student_list[key] = student_name

        return student_list


class Kivo:
    def __init__(self) -> None:
        self.ba = BlueRequest()
        self.schale_fetcher = Schale()
        self.name = "kivo"

        assert self.name in ["gamekee", "kivo"], f"Invalid site name: {self.name}"

        logger.info(f"🚀 Starting to process {self.name} student data")
        self.schale_student_list = self.schale_fetcher.get_list()
        self.student_list = self.get_list()

        logger.info(f"🔗 Starting to build schale-{self.name} ID mapping table")
        self.maptable = self.build_table(self.student_list, self.schale_student_list)

    @property
    def table(self):
        return self.maptable

    @staticmethod
    def _fix_kivo_name(name):
        for key, value in FIX_KIVO_NAME.items():
            if key == name:
                logger.info(
                    f"📝 Correcting name alias for student name {key} -> {value}"
                )
                return name.replace(key, value)
        return name

    @staticmethod
    def _fix_kivo_skin(skin):
        for key, value in FIX_KIVO_SKIN.items():
            if key == skin:
                logger.info(
                    f"📝 Correcting name alias for student skin {key} -> {value}"
                )
                return skin.replace(key, value)
        return skin

    @staticmethod
    def _replace_domain(result):
        result = [
            item.replace("https://static.kivo.fun/images", "/kivo") for item in result
        ]
        return result

    def get(self, url):
        return self.ba.request_kivo(url)

    def get_list(self):
        students = self.ba.request_kivo_list()
        student_list = {}
        for student in students:
            student_name = self._fix_kivo_name(student["given_name_jp"])
            if student["skin"]:
                student_name += f"（{self._fix_kivo_skin(student['skin'])}）"
            student_list[student["id"]] = student_name
        return student_list

    def build_table(self, kivo_student_list, schale_student_list):
        global errors
        schale_kivo_table = {}
        not_found_count = 0
        for key, name in schale_student_list.items():
            search_result = [k for k, v in kivo_student_list.items() if v == name]
            if len(search_result) == 1:
                logger.info(f"🔍 Match found: {key} <- {name} -> {search_result[0]}")
                # schale_kivo_table[key] = search_result[0]
                schale_kivo_table[str(search_result[0])] = key
            else:
                not_found_count += 1
                errors.append(f"{key} - {name}")
                logger.warning(f"No match found: {key}, {name}")

        logger.success(
            f"schale-kivo ID mapping table built, total unmatched students: {not_found_count}"
        )

        return schale_kivo_table


if __name__ == "__main__":
    kivo = Kivo()
    schale = Schale()

    schale_kivo_table = kivo.table
    schale_student_list = schale.student_list

    result = []

    non_limited_list = kivo.get(
        "https://api.kivo.fun/api/v1/data/students/?page=1&page_size=2000&is_install=true&release_date_sort=asc&limited=false"
    )
    for student in non_limited_list["students"]:
        schale_id = schale_kivo_table[str(student["id"])]
        schale_student = schale_student_list[schale_id]
        student = {
            "Id": schale_student["Id"],
            "Name": schale_student["Name"],
            "StarGrade": schale_student["StarGrade"],
        }
        result.append(student)

    with open("../src/assets/data/non_limited_students_all.ts", "w", encoding="utf-8") as f:
        f.write(
            "import type { myStudent } from \"../utils/interface\";\n\n"
            + "export const non_limited_students: myStudent[] = "
            + json.dumps(result, indent=4, ensure_ascii=False)
        )