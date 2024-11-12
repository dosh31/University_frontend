export const isHomePage = (path:string) => {
	return path == "/"
}

export const isSpecialistPage = (path:string) => {
    return path.match(/^\/specialists\/(\d+)/)
}

export const truncate = (source, size=100) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}