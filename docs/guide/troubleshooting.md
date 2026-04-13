# Troubleshooting

## `video.mp4` is missing

If `npm run prepare:assets` fails, confirm that the source video exists at the repository root:

```powershell
Get-Item D:\Prj\pre-milk-workout\video.mp4
```

## Generated metadata looks stale

Run the asset-prep step again:

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
```

The generated file under `src/generated/` is excluded from Git on purpose.

## Render outputs are not committed

This is expected:

- `renders/` is ignored at the root level
- `public/` and `out/` are ignored inside `remotion-app/`
- only docs-safe preview images are tracked for public presentation

## Deprecation warning during asset prep

The current `prepare:assets` run can emit a Node warning about closing file handles during garbage collection. The command still completed successfully in the latest verification pass, but the warning is worth revisiting if the script is refactored later.
