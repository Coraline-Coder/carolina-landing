const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
const orig = c;

console.log('Original size:', orig.length, 'chars');

// 1. REPLACE COLOR CONSTANTS
c = c.replace(
  `const NAVY = "#0A2342";\nconst BLUE = "#2E5F8A";\nconst WHITE = "#FFFFFF";\nconst LGRAY = "#F5F6FA";\nconst NAVY2 = "#0D1B2A";`,
  `const BLACK         = "#000000";\nconst DEEP_NAVY     = "#0B2A5A";\nconst CORE_BLUE     = "#1E3A8A";\nconst BLUE_ELECTRIC = "#3B82F6";\nconst SILVER_METAL  = "#C0C5CE";\nconst GRAY_MEDIUM   = "#9CA3AF";\nconst ZINC_900      = "#111827";\nconst ZINC_800      = "#1F2937";\nconst WHITE         = "#FFFFFF";\nconst OFF_WHITE     = "#F9FAFB";`
);
console.log('Step 1: Color constants replaced');

// 2. GLOBAL CONSTANT RENAMES (order matters: NAVY2 before NAVY)
c = c.replace(/\bNAVY2\b/g, 'BLACK');
c = c.replace(/\bNAVY\b/g, 'DEEP_NAVY');
c = c.replace(/\bBLUE\b/g, 'BLUE_ELECTRIC');
c = c.replace(/\bLGRAY\b/g, 'OFF_WHITE');
console.log('Step 2: Global constant renames done');

// 3. FIX SECTION BACKGROUNDS
// 3a. Hero: solid DEEP_NAVY -> radial gradient
c = c.replace(
  'background: DEEP_NAVY,\n        minHeight: "100vh",',
  'background: "radial-gradient(ellipse at top right, #0B2A5A 0%, #000000 70%)",\n        minHeight: "100vh",'
);
// 3b. Marquee: DEEP_NAVY -> BLACK
c = c.replace(
  'background: DEEP_NAVY, overflow: "hidden"',
  'background: BLACK, overflow: "hidden"'
);
// 3c. Footer: DEEP_NAVY -> BLACK
c = c.replace(
  'background: DEEP_NAVY, padding: "3rem 2rem 2rem",',
  'background: BLACK, padding: "3rem 2rem 2rem",'
);
console.log('Step 3: Section backgrounds fixed');

// 4. NAVBAR UPDATES
// 4a. Scrolled background
c = c.replace(
  'background: scrolled ? "rgba(10,35,66,0.88)" : "transparent",',
  'background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",'
);
// 4b. Scrolled border
c = c.replace(
  'borderBottom: scrolled ? "1px solid rgba(46,95,138,0.1)" : "none",',
  'borderBottom: scrolled ? "1px solid rgba(59,130,246,0.1)" : "none",'
);
// 4c. Mobile menu background
c = c.replace(
  'background: "rgba(10,35,66,0.96)"',
  'background: "rgba(0,0,0,0.96)"'
);
// 4d. Add tagline under CJB in navbar
c = c.replace(
  `<img src="/logo-cb.png" alt="CJB Logo" style={{ height: 36, width: "auto", objectFit: "contain" }} />\n          <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.2rem", color: WHITE, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>CJB</span>`,
  `<img src="/logo-cb.png" alt="CJB Logo" style={{ height: 36, width: "auto", objectFit: "contain" }} />\n          <div style={{ display: "flex", flexDirection: "column" }}>\n            <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.2rem", color: WHITE, letterSpacing: "0.15em", textTransform: "uppercase" as const, lineHeight: 1.2 }}>CJB</span>\n            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "0.5rem", color: SILVER_METAL, letterSpacing: "0.22em", textTransform: "uppercase" as const, lineHeight: 1.2 }}>ESTRATEGIA · KPIS · PAUTA · RESULTADOS</span>\n          </div>`
);
// 4e. Desktop "Agendar llamada" button: add hover
c = c.replace(
  `background: BLUE_ELECTRIC,\n              padding: "0.5rem 1.4rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n              textTransform: "uppercase" as const,\n            }}\n          >\n            Agendar llamada\n          </a>`,
  `background: BLUE_ELECTRIC,\n              padding: "0.5rem 1.4rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n              textTransform: "uppercase" as const,\n              transition: "background 0.25s",\n            }}\n            onMouseEnter={(e) => (e.currentTarget.style.background = CORE_BLUE)}\n            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_ELECTRIC)}\n          >\n            Agendar llamada\n          </a>`
);
console.log('Step 4: Navbar updated');

// 5. FONT UPDATES
c = c.replace(/var\(--font-jost\)/g, "'DM Sans', sans-serif");
console.log('Step 5: Fonts updated (Jost -> DM Sans)');

// 6. HARDCODED COLOR VALUES
// 6a. #2E5F8A (old BLUE) -> #3B82F6 (BLUE_ELECTRIC)
c = c.replace(/#2E5F8A/g, '#3B82F6');
// 6b. rgba(46,95,138,...) -> rgba(59,130,246,...)
c = c.replace(/rgba\(46,\s*95,\s*138,/g, 'rgba(59,130,246,');
console.log('Step 6: Hardcoded colors updated');

// 7. CARD STYLE UPDATES
// 7a. ProblemaSection cards: BLACK -> ZINC_900, add full border
c = c.replace(
  'padding: "2rem",\n                  borderLeft: "3px solid " + BLUE_ELECTRIC,\n                  background: BLACK,\n                  borderRadius: "0 8px 8px 0",',
  `padding: "2rem",\n                  borderLeft: "3px solid " + BLUE_ELECTRIC,\n                  background: ZINC_900,\n                  borderRadius: "0 8px 8px 0",\n                  border: "1px solid " + CORE_BLUE,\n                  borderLeftWidth: "3px",\n                  borderLeftColor: BLUE_ELECTRIC,\n                  transition: "all 0.3s ease",`
);
// 7a2. Add hover to ProblemaSection cards
c = c.replace(
  'borderLeftColor: BLUE_ELECTRIC,\n                  transition: "all 0.3s ease",\n                }}\n              >\n                <div style={{ marginBottom: "0.75rem" }} dangerouslySetInnerHTML={{ __html: item.icon }} />',
  `borderLeftColor: BLUE_ELECTRIC,\n                  transition: "all 0.3s ease",\n                }}\n                onMouseEnter={(e) => {\n                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.borderLeftColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.transform = "translateY(-4px)";\n                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";\n                }}\n                onMouseLeave={(e) => {\n                  e.currentTarget.style.borderColor = CORE_BLUE;\n                  e.currentTarget.style.borderLeftColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.transform = "translateY(0)";\n                  e.currentTarget.style.boxShadow = "none";\n                }}\n              >\n                <div style={{ marginBottom: "0.75rem" }} dangerouslySetInnerHTML={{ __html: item.icon }} />`
);
// 7b. CapacidadesSection cards: background BLACK -> ZINC_900, border update
c = c.replace(
  'background: BLACK,\n                  border: "1px solid rgba(59,130,246,0.2)",',
  'background: ZINC_900,\n                  border: "1px solid " + CORE_BLUE,'
);
// 7c. CapacidadesSection hover: add border color change
c = c.replace(
  'e.currentTarget.style.transform = "translateY(-4px)";\n                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.15)";',
  'e.currentTarget.style.transform = "translateY(-4px)";\n                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";'
);
// 7d. CapacidadesSection hover leave: reset border
c = c.replace(
  'e.currentTarget.style.transform = "translateY(0)";\n                  e.currentTarget.style.boxShadow = "none";',
  'e.currentTarget.style.transform = "translateY(0)";\n                  e.currentTarget.style.borderColor = CORE_BLUE;\n                  e.currentTarget.style.boxShadow = "none";'
);
// 7e. SistemaFiltro cards: update background and border
c = c.replace(
  'background: "rgba(255,255,255,0.05)",\n                  border: "1px solid rgba(59,130,246,0.12)",',
  'background: ZINC_900,\n                  border: "1px solid " + CORE_BLUE,'
);
// 7f. SistemaFiltro hover: add transform and border change
c = c.replace(
  'border: "1px solid " + CORE_BLUE,\n                  borderRadius: 20,\n                  padding: "1.75rem 2rem",\n                  transition: "all 0.3s ease",\n                }}\n              >',
  `border: "1px solid " + CORE_BLUE,\n                  borderRadius: 20,\n                  padding: "1.75rem 2rem",\n                  transition: "all 0.3s ease",\n                }}\n                onMouseEnter={(e) => {\n                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.transform = "translateY(-4px)";\n                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";\n                }}\n                onMouseLeave={(e) => {\n                  e.currentTarget.style.borderColor = CORE_BLUE;\n                  e.currentTarget.style.transform = "translateY(0)";\n                  e.currentTarget.style.boxShadow = "none";\n                }}\n              >`
);
// 7g. ProcesoSection step cards: update background and border
c = c.replace(
  'background: "rgba(255,255,255,0.04)",\n                  borderRadius: 14,\n                  border: "1px solid rgba(59,130,246,0.15)",',
  'background: ZINC_900,\n                  borderRadius: 14,\n                  border: "1px solid " + CORE_BLUE,\n                  transition: "all 0.3s ease",'
);
// 7h. ProcesoSection hover: add transform and border change
c = c.replace(
  'border: "1px solid " + CORE_BLUE,\n                  transition: "all 0.3s ease",\n                }}\n              >\n                <span',
  `border: "1px solid " + CORE_BLUE,\n                  transition: "all 0.3s ease",\n                }}\n                onMouseEnter={(e) => {\n                  e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n                  e.currentTarget.style.transform = "translateY(-4px)";\n                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(59,130,246,0.12)";\n                }}\n                onMouseLeave={(e) => {\n                  e.currentTarget.style.borderColor = CORE_BLUE;\n                  e.currentTarget.style.transform = "translateY(0)";\n                  e.currentTarget.style.boxShadow = "none";\n                }}\n              >\n                <span`
);
console.log('Step 7: Card styles updated');

// 8. LABEL STYLE UPDATES
// 8a. letterSpacing 0.18em -> 0.25em
c = c.replace(/letterSpacing: "0\.18em"/g, 'letterSpacing: "0.25em"');
// 8b. fontSize 0.8rem -> 0.7rem (section labels only, not footer)
c = c.replace(
  /fontSize: "0\.8rem",\n(\s*)letterSpacing: "0\.25em",/g,
  'fontSize: "0.7rem",\n$1letterSpacing: "0.25em",'
);
// 8c. Add accent border to section labels
c = c.replace(
  /color: BLUE_ELECTRIC,\n            marginBottom: "0\.75rem",/g,
  `color: BLUE_ELECTRIC,\n            marginBottom: "0.75rem",\n            borderLeft: "3px solid " + BLUE_ELECTRIC,\n            paddingLeft: "0.75rem",`
);
// 8d. Fix "Mi metodología" label color
c = c.replace(
  'color: "rgba(255,255,255,0.6)",\n            marginBottom: "0.75rem",\n            borderLeft: "3px solid " + BLUE_ELECTRIC,\n            paddingLeft: "0.75rem",',
  `color: BLUE_ELECTRIC,\n            marginBottom: "0.75rem",\n            borderLeft: "3px solid " + BLUE_ELECTRIC,\n            paddingLeft: "0.75rem",`
);
console.log('Step 8: Label styles updated');

// 9. BUTTON STYLE UPDATES
// 9a. Hero primary button: add hover effect
c = c.replace(
  `background: BLUE_ELECTRIC,\n              padding: "0.85rem 2.2rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n            }}\n          >\n            Agendar llamada estratégica\n          </a>`,
  `background: BLUE_ELECTRIC,\n              padding: "0.85rem 2.2rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n              transition: "background 0.25s",\n            }}\n            onMouseEnter={(e) => (e.currentTarget.style.background = CORE_BLUE)}\n            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_ELECTRIC)}\n          >\n            Agendar llamada estratégica\n          </a>`
);
// 9b. Hero secondary button: update border, add hover
c = c.replace(
  `border: "1px solid rgba(255,255,255,0.3)",\n              padding: "0.85rem 2.2rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n            }}\n          >\n            Conocer el Método P.U.L.S.O.\n          </a>`,
  `border: "1px solid " + BLUE_ELECTRIC,\n              padding: "0.85rem 2.2rem",\n              borderRadius: 100,\n              textDecoration: "none",\n              letterSpacing: "0.06em",\n              transition: "all 0.25s",\n            }}\n            onMouseEnter={(e) => {\n              e.currentTarget.style.background = "rgba(59,130,246,0.10)";\n              e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n            }}\n            onMouseLeave={(e) => {\n              e.currentTarget.style.background = "transparent";\n              e.currentTarget.style.borderColor = BLUE_ELECTRIC;\n            }}\n          >\n            Conocer el Método P.U.L.S.O.\n          </a>`
);
// 9c. Contact primary button: add hover
c = c.replace(
  `background: BLUE_ELECTRIC,\n                padding: "0.9rem 2.4rem",\n                borderRadius: 100,\n                textDecoration: "none",\n                letterSpacing: "0.04em",\n              }}\n            >\n              Agendar llamada estratégica\n            </a>`,
  `background: BLUE_ELECTRIC,\n                padding: "0.9rem 2.4rem",\n                borderRadius: 100,\n                textDecoration: "none",\n                letterSpacing: "0.04em",\n                transition: "background 0.25s",\n              }}\n              onMouseEnter={(e) => (e.currentTarget.style.background = CORE_BLUE)}\n              onMouseLeave={(e) => (e.currentTarget.style.background = BLUE_ELECTRIC)}\n            >\n              Agendar llamada estratégica\n            </a>`
);
// 9d. Contact WhatsApp button: update border + radius
c = c.replace(
  `border: "1px solid rgba(255,255,255,0.3)",\n                padding: "0.9rem 2.2rem",\n                borderRadius: 6,`,
  `border: "1px solid " + BLUE_ELECTRIC,\n                padding: "0.9rem 2.2rem",\n                borderRadius: 100,\n                transition: "all 0.25s",`
);
// 9e. Contact WhatsApp button: add hover
c = c.replace(
  `borderRadius: 100,\n                transition: "all 0.25s",\n                textDecoration: "none",\n                letterSpacing: "0.04em",\n              }}\n            >\n              WhatsApp directo\n            </a>`,
  `borderRadius: 100,\n                transition: "all 0.25s",\n                textDecoration: "none",\n                letterSpacing: "0.04em",\n              }}\n              onMouseEnter={(e) => {\n                e.currentTarget.style.background = "rgba(59,130,246,0.10)";\n              }}\n              onMouseLeave={(e) => {\n                e.currentTarget.style.background = "transparent";\n              }}\n            >\n              WhatsApp directo\n            </a>`
);
console.log('Step 9: Button styles updated');

// 10. FOOTER UPDATES - add tagline
c = c.replace(
  'Performance Marketing &amp; Paid Media Strategy\n        </p>\n        <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>',
  `Performance Marketing &amp; Paid Media Strategy\n        </p>\n        <p\n          style={{\n            fontFamily: "'DM Sans', sans-serif",\n            fontWeight: 400,\n            fontSize: "0.55rem",\n            color: SILVER_METAL,\n            letterSpacing: "0.3em",\n            textTransform: "uppercase" as const,\n            marginTop: "-0.25rem",\n          }}\n        >\n          ESTRATEGIA · KPIS · PAUTA · RESULTADOS\n        </p>\n        <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>`
);
console.log('Step 10: Footer updated');

// 11. ADD GOOGLE FONTS + WRAP PAGE WITH FRAGMENT
c = c.replace(
  'return (\n    <main style={{ overflowX: "hidden" }}>',
  "return (\n    <>\n      <style>{String.raw`\n        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');\n      `}</style>\n      <main style={{ overflowX: \"hidden\" }}>"
);
c = c.replace(
  '</main>\n  );',
  '</main>\n    </>\n  );'
);
console.log('Step 11: Google Fonts + Page wrapper added');

// 12. PULSO SECTION SPECIFICS
// 12b. Update word label color
c = c.replace(
  'color: "rgba(255,255,255,0.45)",\n                      marginTop: "0.35rem",',
  'color: SILVER_METAL,\n                      marginTop: "0.35rem",'
);
// 12c. Update result badge background
c = c.replace(
  'background: "rgba(255,255,255,0.06)",\n              border: "1px solid rgba(59,130,246,0.2)",',
  'background: "rgba(59,130,246,0.06)",\n              border: "1px solid rgba(59,130,246,0.2)",'
);
console.log('Step 12: PULSO section specifics updated');

// 13. HERO LOGO DROP SHADOW
c = c.replace(
  'filter: "drop-shadow(0 0 20px rgba(46,95,138,0.3))"',
  'filter: "drop-shadow(0 0 20px rgba(59,130,246,0.3))"'
);
console.log('Step 13: Hero drop shadow updated');

// 14. CONTACT SECTION LABEL - inline display for centered border
c = c.replace(
  'paddingLeft: "0.75rem",\n          }}\n          >\n            Siguiente paso',
  'paddingLeft: "0.75rem",\n            display: "inline-block",\n          }}\n          >\n            Siguiente paso'
);
console.log('Step 14: Contact label display fixed');

// WRITE FILE
fs.writeFileSync('src/app/page.tsx', c, 'utf8');
console.log('\n✅ Redesign complete!');
console.log('Size:', orig.length, '->', c.length, 'chars');
