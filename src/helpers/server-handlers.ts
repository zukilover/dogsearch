// Mocked requests that are used by msw in the unit tests.
// We can add additional server handlers at runtime (within a test) and 
// then reset the server to the original handlers (effectively removing the runtime handlers) 
// to preserve test isolation.
import { rest } from "msw";

const handlers = [
    rest.get('/images/search', (req, res, ctx) => {
        const mockResponse: Record<any, any>[] | null = [{
            "breeds": [
                {
                    "weight": {
                        "imperial": "90 - 120",
                        "metric": "41 - 54"
                    },
                    "height": {
                        "imperial": "28 - 34",
                        "metric": "71 - 86"
                    },
                    "id": 5,
                    "name": "Akbash Dog",
                    "bred_for": "Sheep guarding",
                    "breed_group": "Working",
                    "life_span": "10 - 12 years",
                    "temperament": "Loyal, Independent, Intelligent, Brave",
                    "origin": "",
                    "reference_image_id": "26pHT3Qk7"
                }
            ],
            "id": "SyfsC19NQ",
            "url": "https://cdn2.thedogapi.com/images/SyfsC19NQ_1280.jpg",
            "width": 1100,
            "height": 733
        }, {
            "breeds": [
                {
                    "weight": {
                        "imperial": "6 - 13",
                        "metric": "3 - 6"
                    },
                    "height": {
                        "imperial": "9 - 11.5",
                        "metric": "23 - 29"
                    },
                    "id": 1,
                    "name": "Affenpinscher",
                    "bred_for": "Small rodent hunting, lapdog",
                    "breed_group": "Toy",
                    "life_span": "10 - 12 years",
                    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
                    "origin": "Germany, France",
                    "reference_image_id": "BJa4kxc4X"
                }
            ],
            "id": "BJa4kxc4X",
            "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg",
            "width": 1600,
            "height": 1199
        }]
        return res(
            ctx.status(200),
            ctx.json(mockResponse),
        )
    }),
    rest.get('/breeds', (req, res, ctx) => {
        const mockResponse: Record<any, any>[] | null = [{
            "weight": {
                "imperial": "6 - 13",
                "metric": "3 - 6"
            },
            "height": {
                "imperial": "9 - 11.5",
                "metric": "23 - 29"
            },
            "id": 1,
            "name": "Affenpinscher",
            "bred_for": "Small rodent hunting, lapdog",
            "breed_group": "Toy",
            "life_span": "10 - 12 years",
            "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            "origin": "Germany, France",
            "reference_image_id": "BJa4kxc4X",
            "image": {
                "id": "BJa4kxc4X",
                "width": 1600,
                "height": 1199,
                "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
            }
        }]
        return res(
            ctx.status(200),
            ctx.json(mockResponse),
        )
    }),
]

export default handlers
