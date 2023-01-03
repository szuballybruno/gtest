param ( 
    [string] $client_env = "epitest",
    [switch] $builddeps,
    [switch] $buildx,
    [string] $cachescope = 'local',
    [string] $cachetype = 'registry'
)

$root = Resolve-Path "${PSScriptRoot}/../../"
$episto_root = Resolve-Path "${root}/epistogram/"
$imgbuild = "${PSScriptRoot}/imgbuild.ps1"

echo "Build deps: ${buiddeps}"
echo "Root: ${root}"
echo "Episto root: ${episto_root}"
echo "Buildx: ${buildx}"

if ($builddeps) 
{
    # build monodeps
    & $imgbuild `
        -dockerfile "${episto_root}/docker/monodeps.Dockerfile" `
        -tag "monodeps" `
        -contextpath "${root}" `
        -buildx:$buildx `
        -cachescope:$cachescope `
        -cachetype:$cachetype
}

# build monosrc
& $imgbuild `
    -dockerfile "${episto_root}/docker/monosrc.Dockerfile" `
    -tag "monosrc" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cachescope:$cachescope `
    -cachetype:$cachetype

# build server
& $imgbuild `
    -dockerfile "${episto_root}/packages/server-api/server.Dockerfile" `
    -tag "server" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cachescope:$cachescope `
    -cachetype:$cachetype

# build client
& $imgbuild `
    -dockerfile "${episto_root}/packages/frontend/client.Dockerfile" `
    -tag "client" `
    -contextpath "${root}" `
    -buildarg "ENVIRONMENT_NAME=${client_env}" `
    -buildx:$buildx `
    -cachescope:$cachescope `
    -cachetype:$cachetype

# build tests-client
& $imgbuild `
    -dockerfile "${episto_root}/packages/tests-client/testsclient.Dockerfile" `
    -tag "tests-client" `
    -contextpath "${root}" `
    -buildx:$buildx `
    -cachescope:$cachescope `
    -cachetype:$cachetype