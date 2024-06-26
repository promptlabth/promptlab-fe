export const urlLinks = [
    { titleKey: 'home.title', href: '/' },
    { titleKey: 'createSellingPost.title', href: '/createSellingPost' },
    { titleKey: 'createContents.title', href: '/createIdeaContent' },
    { titleKey: 'createArticle.title', href: '/createArticle' },
    { titleKey: 'createScripts.title', href: '/createShortVideoScripts' },
    { titleKey: 'createClickBait.title', href: '/createClickBaitWord' },
];


// export const serverApiUrl = "https://prompt-lab-be-uu4qhhj35a-as.a.run.app/v1"
export const serverApiUrl = process.env.NEXT_PUBLIC_API_URL
export const oldServerApiUrl = "https://dev---prompt-lab-be-uu4qhhj35a-as.a.run.app/1"
export const paymentApiUrl = "https://ms-payment-uu4qhhj35a-as.a.run.app/"