

export const formatUserData = (data: any) => {
    const copy = {...data}
    delete copy["__v"]
    delete copy["passwordHash"]
    delete copy["updatedAt"]
    delete copy["createdAt"]
    return copy
}