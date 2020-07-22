const DASHBOARD = [
    { name: "Profile", path: "", focusElement: "" },
    { name: "Sign out", path: "", focusElement: "" }
];

const LANDING_PAGE = [
    { name: "Checking", path: "", focusElement: "" },
    { name: "Savings", path: "", focusElement: "" },
    { name: "Investments", path: "", focusElement: "" },
    { name: "Sign in", path: "", focusElement: "" },
    { name: "Sign up", path: "", focusElement: "" }
]

export function getHeaderItems(page) {
    switch(page) {
        case "dashboard":
            return DASHBOARD;
        case "landing-page":
            return LANDING_PAGE;
        default:
            return []
    }
}