import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    if (!title) {
        return NextResponse.json(
            { error: "検索語を入力してください" },
            { status: 400 }
        );
    }

    try {
        const endpoint = "https://ja.wikipedia.org/w/api.php";
        const params = new URLSearchParams({
            action: "query",
            titles: title,
            prop: "pageimages",
            format: "json",
            piprop: "original|thumbnail",
            pithumbsize: "500",
            pilimit: "1",
            origin: "*",
        });
        // console.log("params", params);

        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        const pages = data.query.pages;
        const page = Object.values(pages)[0] as {
            original?: { source: string };
            thumbnail?: { source: string };
        };

        if (page.original?.source) {
            return NextResponse.json({ imageUrl: page.original.source });
        } else if (page.thumbnail?.source) {
            return NextResponse.json({ imageUrl: page.thumbnail.source });
        } else {
            return NextResponse.json(
                { error: "画像が見つかりませんでした" },
                { status: 404 }
            );
        }
    } catch (err) {
        console.error("Error fetching wiki image:", err);
        return NextResponse.json(
            { error: "画像の取得に失敗しました" },
            { status: 500 }
        );
    }
}
