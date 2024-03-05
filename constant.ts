export const urlLinks = [
    { titleKey: 'home.title', href: '/' },
    { titleKey: 'createSellingPost.title', href: '/createSellingPost' },
    { titleKey: 'createContents.title', href: '/createIdeaContent' },
    { titleKey: 'createArticle.title', href: '/createArticle' },
    { titleKey: 'createScripts.title', href: '/createShortVideoScripts' },
    { titleKey: 'createClickBait.title', href: '/createClickBaitWord' },
];

export const features: { [key: string]: number } = {
    'createSellingPost.title': 1,
    'createContents.title': 2,
    'createArticle.title': 3,
    'createScripts.title': 4,
    'createClickBait.title': 5
}

export const serverApiUrl = "https://dev---prompt-lab-be-uu4qhhj35a-as.a.run.app/"
export const paymentApiUrl = "https://ms-payment-uu4qhhj35a-as.a.run.app"

export const subscriptionPlanColorMap: { [key: string]: string } = {
    "Gold": "#FFB800",
    "Silver": "#A8A8A8",
    "Bronze": "#33393F",
    "Free": "#33393F"
}

export const prizeIdBronze = "price_1OLSgkAom1IgIvKK9c3qAqMT"
export const prizeIdSilver = "price_1OLShKAom1IgIvKKt8q5fCBI"
export const prizeIdGold = "price_1OLSi0Aom1IgIvKKD24dXvtu"