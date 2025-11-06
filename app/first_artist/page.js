"use client";
import Image from "next/image";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const colors = {
  primary: ["#001026", "#0A192B", "#BEA173", "#C8BD93", "#FFFAFA"],
  secondary: ["#3F000F", "#CC7722", "#8E775E", "#FFFFFF", "#000000"],
};

export default function IsmailArtist() {
  return (
    <div
      className={lato.className}
      style={{
        padding: "40px",
        background: "#001026",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* PHOTO */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Image
          src="/images/ismail.jpg"
          alt="Artiste Ismail"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* TITRE */}
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          color: "#FFFAFA",
          textAlign: "center",
        }}
      >
        🎨 Ismaïl — Artiste Tunisien
      </h1>

      {/* BIO */}
      <section style={{ marginTop: "20px", maxWidth: "800px", margin: "auto" }}>
        <h2 style={{ color: "#C8BD93", marginBottom: "10px" }}>Biographie</h2>
        <p style={{ lineHeight: "1.7", fontSize: "18px", color: "#FFFAFA" }}>
          Ismaïl est un artiste peintre tunisien dont l’œuvre explore la mémoire
          et la lumière. Né au cœur d’un paysage méditerranéen vibrant, il
          transforme chaque toile en un fragment de poésie visuelle.  
          <br /><br />
          Ses couleurs — profondes, chaudes et terreuses — narrent la relation
          entre la tradition et la modernité. Son travail mêle textures et
          techniques contemporaines, créant une signature artistique unique.
        </p>
      </section>

      {/* COLLECTION */}
      <section style={{ marginTop: "50px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ color: "#C8BD93", marginBottom: "20px" }}>
          Collection de peintures
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {[ 
            { title: "Mémoire du sable", color: "#BEA173" },
            { title: "Ombres du soir", color: "#0A192B" },
            { title: "Chaleur d’ocre", color: "#CC7722" },
            { title: "Silence blanc", color: "#FFFAFA", text: "#000" },
          ].map((p, index) => (
            <div
              key={index}
              style={{
                background: p.color,
                padding: "30px",
                height: "220px",
                borderRadius: "10px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: p.text || "#fff",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "22px" }}>{p.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PALETTE */}
      <section style={{ marginTop: "60px", maxWidth: "1000px", margin: "auto" }}>
        <h2 style={{ color: "#C8BD93", marginBottom: "10px" }}>
          Palette de couleurs
        </h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {colors.primary.map((c, i) => (
            <div
              key={i}
              style={{
                background: c,
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            ></div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {colors.secondary.map((c, i) => (
            <div
              key={i}
              style={{
                background: c,
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
}
