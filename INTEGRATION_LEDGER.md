# Integration Ledger

**TL;DR:** registro de fatos, não de análise. Cada linha aqui reflete a confirmação pós-implementação dos 7 componentes da landing page da Alquimia Espacial.

---

## Componentes integrados

| Componente | Âncoras/IDs expostos | Elemento global declarado | Comportamento de scroll declarado | Faixa de z-index reivindicada |
|---|---|---|---|---|
| **Componente 01 — Hero Frames** | `#hero-section`, `#why-cocreate-section`, `#video-section` | Cabeçalho global fixo (`<header>` z-40) e Modais (`z-50`) | Sincronizado do frame 001 ao 100 até `#video-section` (onde congela) + Fluxo normal | `z-0` (Canvas frames), `z-10`..`z-20` (conteúdo), `z-40` (header), `z-50` (modais) |
| **Componente 02 — Processos** | `#processes`, `#timeline-scroll-wrapper`, `#timeline-sticky-screen-container` | N/A (recuo superior para header) | Pinned / Virtual Scroll (`1200vh` Desktop / `1300vh` Mobile) com Efeito Cortina sobre a Hero | `z-20` a `z-30` |
| **Componente 03 — Clientes** | `#projects`, `#testimonials` | N/A | Fluxo normal (Órbita 3D + Headline + Marquee de Depoimentos) | `z-0` (vídeo), `z-10` (órbita/marquee), `z-50` (modal de projeto) |
| **Componente 04 — Entrega** | `#deliverables`, `#secao-alinhamento` | N/A | Fluxo normal (7 entregáveis + Split comparativo) | `relative z-10` |
| **Componente 05 — Plano** | `#plans` | N/A | Fluxo normal (SaaS 4 Passos com vídeo bg) | `z-0` (vídeo bg), `z-10` (cards) |
| **Componente 06 — FAQ** | `#faq` | N/A | Fluxo normal (FAQ com busca global e `GridBackground`) | `z-0` (grid bg), `z-10` (acordeão) |
| **Componente 07 — Contato** | `#contact`, `#secao-sobre-o-arquiteto`, `#secao-cta-final`, `#secao-rodape` | Rodapé global da página | Fluxo normal (Arquiteto giro 3D + Banner CTA com zoom + Rodapé) | `-z-10` (auras), `z-0` (gradientes), `z-10` (conteúdo) |

---

## Pendências abertas

- Nenhuma pendência registrada. Âncoras de menu reconciliadas em `/finalizar-pagina` (21/08/2025):
  - `#alignment` → corrigido para `#secao-alinhamento`
  - `#architect` → corrigido para `#secao-sobre-o-arquiteto`  
  - `#onboarding` → sub-item removido (seção inexistente)
  - `#testimonials` → `id` adicionado ao componente raiz de `TestimonialsSection`
- **Status:** ✅ Página finalizada — pronta para `/unificar-global-css` e deploy.
