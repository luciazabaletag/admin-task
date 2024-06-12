
export const formatDate = (date : string) => {
    const newDate = new Date(date);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    } as const;

    return newDate.toLocaleDateString('es-ES', options)
}