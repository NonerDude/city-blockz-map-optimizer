# References (Tower Bloxx / City Bloxx)

Material outside this repo that informs expectations for rules and optimisation. **Edition matters**: Flash, JavaME/Nokia bundles labelled **City Bloxx**, later mobile / **Tower Bloxx** sequels (e.g. **Tower Bloxx Deluxe**, **Tower Bloxx 3D**) may differ in scoring, counts, or unlocks—model those as **rule packs** when we wire real constraints.

## Official-style overviews

| Resource | Notes |
|----------|--------|
| [Tower Bloxx — Gamia Archive](https://gamia-archive.fandom.com/wiki/Tower_Bloxx) | Covers Digital Chocolate’s original (2005), **Build City** vs **Quick Game**, tower colours (residential / commercial / office / luxury), progression framing. Notes Nokia bundles using the **City Bloxx** name for the same core idea. |
| [Tower Bloxx — JayIsGames review](https://jayisgames.com/review/tower-bloxx.php) | Aug 2007 Flash-era review: **Quick Game** vs **Build City**, crane/stacking skill vs grid placement, combo scoring, **bonus roofs**; long comment thread with player layouts (e.g. **13 yellow** on a full **5×5**), demolish/replace strategies, and version-specific score anecdotes. |

## Math / solver adjacent

| Resource | Notes |
|----------|--------|
| [r/math: City Bloxx optimisation](https://www.reddit.com/r/math/comments/4l2nzj/city_bloxx_optimisation/) | Informal constraint discussion on small grids. |
| [Math.SE: puzzle](https://math.stackexchange.com/questions/3863517/an-interesting-puzzle-in-an-otherwise-boring-game) | Related puzzle framing. |
| [TowerBlocksOptimizer (GitHub)](https://github.com/kevindalmeijer/TowerBlocksOptimizer) | Example solver stack for similar tier/adjacency patterns—compare outputs against **your** rule pack only. |

## Takeaways for this codebase

1. **Naming**: sources mix **Tower Bloxx** and **City Bloxx** (often same lineage; sequels add features). Prefer neutral strings like **tier colour** in code and reserve branding for UI copy.
2. **Modes**: **Build City** (grid of towers / population) vs **Quick Game** (single endless stack) are different optimisation surfaces—this project targets **grid / Build City–style** maps unless we add a Quick module later.
3. **Placement vs rebuild**: player discussions repeatedly stress that **adjacency rules apply when placing**; buildings can later be **demolished or overwritten** to reach dense yellow layouts—aligns with keeping **`rules`** separate from static layout snapshots (`docs/DOMAIN.md`).
4. **Roofs**: **bonus / special roofs** tie to stacking skill and unlock progression; treat separately from base tier adjacency unless you confirm they change legality on your build.
