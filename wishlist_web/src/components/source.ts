// biome-ignore lint/style/useConst: <explanation>
let idList: string[] = [];

export function addToIdList(id: string) {
    idList.push(id);
}

export function getAllIds() {
    console.log(idList);
}