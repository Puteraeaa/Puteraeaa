import fetch from "node-fetch";
import fs from "fs";

async function getQuote() {
    try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        const quote = `"${data[0].q}" — ${data[0].a}`;

        // Membaca file README.md secara sinkron
        let readme = fs.readFileSync("./README.md", "utf8");

        // Mengganti bagian yang ada dengan quote baru
        readme = readme.replace(
            /<p.*?><em>\s*".*?"\s*—\s*.*?\s*<\/em><\/p>/s,
            `<p align="center"><em>\n  "${quote}"\n</em></p>`
        );

        // Menulis kembali perubahan ke README.md
        fs.writeFileSync("README.md", readme, { encoding: "utf8" });

        console.log("✅ README.md updated successfully!");
        console.log(`📝 New quote added: ${quote} `);

        console.log("📂 Reading README.md...");
        console.log(readme); // Log isi file sebelum diubah

    } catch (error) {
        console.error("❌ Error fetching quote:", error);
    }
}

getQuote();
