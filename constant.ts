export const urlLinks = [
    { titleKey: 'home.title', href: '/' },
    { titleKey: 'createSellingPost.title', href: '/createSellingPost' },
    { titleKey: 'createContents.title', href: '/createIdeaContent' },
    { titleKey: 'createArticle.title', href: '/createArticle' },
    { titleKey: 'createScripts.title', href: '/createShortVideoScripts' },
    { titleKey: 'createClickBait.title', href: '/createClickBaitWord' },
];

export const features : { [key: string]: number } = {
    'createSellingPost.title':1,
    'createContents.title':2,
    'createArticle.title':3,
    'createScripts.title':4,
    'createClickBait.title':5
}

export const serverApiUrl = "https://prompt-lab-be-dev-uu4qhhj35a-as.a.run.app"
export const paymentApiUrl = "https://ms-payment-test-uu4qhhj35a-as.a.run.app"

export const subscriptionPlanColorMap: { [key: string]: string } = {
    "Gold": "#FFB800",
    "Silver": "#A8A8A8",
    "Bronze": "#33393F",
    "Free": "#33393F"
 }