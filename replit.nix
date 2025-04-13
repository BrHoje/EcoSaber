{pkgs}: {
  deps = [
    pkgs.fontconfig
    pkgs.glibc
    pkgs.xorg.libxcb
    pkgs.postgresql
    pkgs.dbus
    pkgs.nspr
    pkgs.chromium
    pkgs.pango
    pkgs.alsa-lib
    pkgs.libxkbcommon
    pkgs.xorg.libXrandr
    pkgs.xorg.libXext
    pkgs.xorg.libX11
    pkgs.libdrm
    pkgs.cups
    pkgs.at-spi2-atk
    pkgs.nss
    pkgs.xorg.libXScrnSaver
    pkgs.gtk3
    pkgs.glib
  ];
}
