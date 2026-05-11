npm run testbuild
rsync -av -e 'ssh -p 7822' -f'- .git/' --delete ./dist/ jamiesan@jsanborn.dev:/home/jamiesan/public_html/testing/cube/
