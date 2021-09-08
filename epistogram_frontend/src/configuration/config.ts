export const globalConfig = {
    siteUrl: "http://localhost:3000", // Per jel nélkül
    backendUrl: "http://localhost:5000/",
    backendUrlMinimal: "http://localhost:5000/",

    verboseLogging: false,

    // siteUrl: "https://dev.epistogram.com", // Per jel nélkül
    // backendUrlMinimal: "https://dev.epistogram.com/",
    // backendUrl: "https://dev.epistogram.com/api/",

    //siteUrl: "http://itsfourothree.tplinkdns.com:3000",
    //backendUrlMinimal: "http://itsfourothree.tplinkdns.com:5000/",
    //backendUrl: "http://itsfourothree.tplinkdns.com:5000/",

    assetStorageUrl: "https://storage.googleapis.com/epistogram_bucket_dev",
    currentTheme: "nextGenTheme",
    adminMenuItems: [{
        title: "Statisztika",
        path: "/statistics"
    }, {
        title: "Felhasználók kezelése",
        path: "/manage/users"
    }, {
        title: "Kurzusok kezelése",
        path: "/manage/courses"
    }, {
        title: "Csoportok kezelése",
        path: "/manage/groups"
    }, {
        title: "Cégek kezelése",
        path: "/manage/organizations"
    }]
}
