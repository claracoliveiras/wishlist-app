import { describe, expect, it, test} from "bun:test";
import { createNewWishlistItem, getAllWishlistItems, deleteSingleItemByName } from './req_methods';

test("Should display every item on said wishlist", async () => { 
    const items = await getAllWishlistItems();
    console.log(items);
    expect(items).toBeArray();
});

