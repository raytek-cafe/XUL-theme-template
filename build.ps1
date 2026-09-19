#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$launcher = Get-Command py -ErrorAction SilentlyContinue
if ($launcher) {
    & py -3 (Join-Path $PSScriptRoot 'build.py')
} else {
    & python (Join-Path $PSScriptRoot 'build.py')
}

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
