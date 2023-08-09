import { createI18n } from 'vue-i18n'

const messages = {
    zh: {
        mainTitle: '学生招募',
        title: '通常招募',
        subtitle: '来招募更多性格迥异的学生吧!',
        notice: '选择招募 10 次，必定获得 1 名 3★ 学生! ※ 点击右上角按钮切换语言/查看招募记录',
        gacha1: '招募 1 次',
        gacha10: '招募 10 次',
        recruitPoint: '招募点数',
        reset: '重置',
        modalTitle: '通知',
        modalBody: '招募 %num 次？',
        modalAgain: '再次招募？',
        cancel: '取消',
        confirm: '确定',
        history: '招募记录',
        again: '再来一次'
    },
    ja: {
        mainTitle: '生徒募集',
        title: '通常募集',
        subtitle: '個性豊かな生徒たちを募集しましょう!',
        notice: '10回募集では、★2以上の生徒が1人確定! ※ この右上のボタンをクリックして言語を切り替えたり/募集記録を確認したりしてください。',
        gacha1: '1 回募集',
        gacha10: '10 回募集',
        recruitPoint: '呼び出しポイント',
        reset: 'リセット',
        modalTitle: 'アラート',
        modalBody: '%num 回募集？',
        modalAgain: '続けて募集？',
        cancel: 'キャンセル',
        confirm: 'OK',
        history: '呼び出し生徒',
        again: '続けて募集'
    },
    en: {
        mainTitle: 'Student Recruitment',
        title: 'Standard Recruitment',
        subtitle: 'Recruit a diverse range of students!',
        notice: 'Select 10 times to guarantee at least one 3★ student! ※ Click the button in the upper right corner to switch languages/view recruitment history.',
        gacha1: 'Recruit 1',
        gacha10: 'Recruit 10',
        recruitPoint: 'Recruitment Points',
        reset: 'Reset',
        modalTitle: 'Notification',
        modalBody: 'Recruit %num time(s)?',
        modalAgain: 'Recruit again?',
        cancel: 'Cancel',
        confirm: 'Confirm',
        history: 'Recruitment History',
        again: 'Try Again'
    }
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,

    locale: 'zh',
    messages
})

export default i18n
