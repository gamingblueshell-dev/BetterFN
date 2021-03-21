const https = require("https")
const fs = require("fs")

https.get("https://benbotfn.tk/api/v1/newCosmetics", (r) => {
    let cosmetics = []
    let variants = []

    let str = ""

    r.on("data", d => str += d.toString())

    r.on("end", () => {
        str = JSON.parse(str)

        str['items'].forEach(c => {
            cosmetics.push({
                name: c.name || "",
                id: c.id,
                backendType: c.backendType
            })

            if (c.variants) {
                let finalVariants = []

                c.variants.forEach(v => {
                    finalVariants.push({
                        channel: v.channel,
                        properties: v.options.map(x => x.tag || "")
                    })
                })

                variants.push({
                    id: c.id,
                    vtids: [],
                    variants: finalVariants
                })
                
            }
        })

        fs.writeFileSync("./cosmetics.json", JSON.stringify(cosmetics, null, 4))
        fs.writeFileSync("./variants.json", JSON.stringify(variants, null, 4))
    })

})