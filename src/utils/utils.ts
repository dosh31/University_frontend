export const formatDate = (value:string) => {
    if (value) {
        return new Intl.DateTimeFormat("ru",  {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(Date.parse(value)).replace("в ", "");
    }
}