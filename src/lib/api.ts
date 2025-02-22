import { fetch } from "@tauri-apps/plugin-http"

interface CatalogItem {
	id: number,
	itemType: "Asset",
	assetType: number,
	name: string,
	description: string,
	productId: number,
	itemStatus: [],
	itemRestrictions: [],
	creatorHasVerifiedBadge: boolean,
	creatorType: "User" | "Group",
	creatorTargetId: number,
	price: number,
	lowestPrice: number,
	lowestResalePrice: number,
	purchaseCount: number,
	favoriteCount: number,
	offSaleDeadline: null,
	collectibleItemId: string,
	totalQuantity: number,
	saleLocationType: string,
	hasResellers: boolean
}

interface CatalogResponse {
	keyword: string,
	previousPageCursor: string | null,
	nextPageCursor: string | null,
	data: CatalogItem[]
}

export async function SearchCatalog(keyword: string, cursor?: string) {
	const queryParams = new URLSearchParams({
		Keyword: keyword,
		Limit: "30",
		...(cursor && { Cursor: cursor })
	})

	const resp: CatalogResponse = await fetch(`https://catalog.roblox.com/v1/search/items/details?${queryParams.toString()}`)
		.then((resp) => resp.json())
		.catch((e) => {console.error(e); return undefined})

	if (!resp) return undefined
	if (resp.keyword !== keyword) return false

	return resp
}
