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
	creatorName: string,
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

interface CatalogSearchResponse {
	keyword: string,
	previousPageCursor: string | null,
	nextPageCursor: string | null,
	data: CatalogItem[]
}

export async function SearchGroupAssets(GroupId: number, cursor?: string) {
	const queryParams = new URLSearchParams({
		creatorTargetId: `${GroupId}`,
		limit: "30",
		creatorType: "Group",
		sortOrder: "Desc",
		sortType: "Updated",
		category: "All",
		...(cursor && { Cursor: cursor })
	})

	const resp: CatalogSearchResponse = await fetch(`https://catalog.roblox.com/v1/search/items/details?${queryParams.toString()}`)
		.then((resp) => resp.json())
		.catch((e) => {console.error(e); return undefined})

	return resp.data
}

export async function SearchCatalog(keyword: string, cursor?: string) {
	const queryParams = new URLSearchParams({
		Keyword: keyword,
		Limit: "30",
		...(cursor && { Cursor: cursor })
	})

	const resp: CatalogSearchResponse = await fetch(`https://catalog.roblox.com/v1/search/items/details?${queryParams.toString()}`)
		.then((resp) => resp.json())
		.catch((e) => {console.error(e); return undefined})

	if (!resp) return undefined
	if (resp.keyword !== keyword) return false

	return resp
}

export async function FullSearch(keyword: string) {
	const ItemsSearch = await SearchCatalog(keyword)
	if (ItemsSearch == false || !ItemsSearch) return ItemsSearch

	const AllItems: CatalogItem[] = [...ItemsSearch.data]
	if (ItemsSearch.nextPageCursor) {
		const SecondPage = await SearchCatalog(keyword, ItemsSearch.nextPageCursor)
		if (SecondPage) {
			AllItems.push(...SecondPage.data)

			if (SecondPage.nextPageCursor) {
				const ThirdPage = await SearchCatalog(keyword, SecondPage.nextPageCursor)
				if (ThirdPage) {
					AllItems.push(...ThirdPage.data)
				}
			}
		}
	}

	console.log(`Got ${AllItems.length} items.`)

	const finishedItems: CatalogItem[] = []
	const searched: number[] = []

	for(const Asset of AllItems){
		finishedItems.push(Asset)
		if(Asset.creatorType == "Group" && !searched.includes(Asset.creatorTargetId)){
			console.log(`Searching group ${Asset.creatorName}`)
			searched.push(Asset.creatorTargetId)

			const items = await SearchGroupAssets(Asset.creatorTargetId).catch(() => undefined)
			if(items) {
				const filter = items
					.filter((v) => !finishedItems.find((a) => a.id == v.id))
				console.log(`Got ${filter.length} items.`)
				finishedItems.push(...filter)
			}
			
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

	return finishedItems
}
