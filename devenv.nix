{pkgs, ...}: {
  packages = [
    pkgs.nodejs_24
    pkgs.nodePackages.pnpm
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.eslint
    pkgs.nodePackages.prettier
  ];

  languages = {
    javascript = {
      enable = true;
      npm.enable = false;
      package = pkgs.nodejs_24;
    };
  };

  processes = {
    dev.exec = "pnpm run dev";
  };

  enterShell = ''
    echo "Node.js development environment loaded"
    echo "Node version: $(node --version)"
    echo "pnpm version: $(pnpm --version)"
  '';
}

