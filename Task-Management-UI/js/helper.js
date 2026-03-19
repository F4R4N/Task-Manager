export function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

export function formatDateTime(isoDateTime){
    return new Date(isoDateTime).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

export function loadComponentCSS(id, src){
    if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = src;
        document.head.appendChild(link);
    }
}
