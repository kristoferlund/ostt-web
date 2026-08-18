#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

export OSTT_INSTALLER_SOURCE_ONLY=1
export HOME="$TMP/home"
export XDG_CONFIG_HOME="$HOME/.config"

# shellcheck source=../public/install
. "$ROOT/public/install"

mkdir -p "$XDG_CONFIG_HOME/hypr" "$HOME/bin" "$XDG_CONFIG_HOME/ostt"

cat >"$XDG_CONFIG_HOME/hypr/bindings.lua" <<'EOF'
-- Personal bindings.
EOF

cat >"$XDG_CONFIG_HOME/hypr/hyprland.lua" <<'EOF'
require("default.hypr.omarchy")
require("hypr.bindings")
EOF

cat >"$HOME/bin/ostt" <<'EOF'
#!/usr/bin/env bash
set -e
config="${XDG_CONFIG_HOME:-$HOME/.config}/ostt/ostt.toml"
mkdir -p "$(dirname "$config")"
if [ ! -f "$config" ]; then
  printf 'config_version = "test"\n\n[audio]\n' >"$config"
fi
if [ "${1:-} ${2:-}" = "model current" ]; then
  printf 'No model selected.\n'
fi
EOF
chmod +x "$HOME/bin/ostt"

configure_omarchy_bindings "$HOME/bin/ostt" "$XDG_CONFIG_HOME/hypr/bindings.lua"
configure_omarchy_bindings "$HOME/bin/ostt" "$XDG_CONFIG_HOME/hypr/bindings.lua"
configure_omarchy_window "$XDG_CONFIG_HOME/hypr/hyprland.lua"
configure_omarchy_window "$XDG_CONFIG_HOME/hypr/hyprland.lua"
configure_omarchy_agent_action "$HOME/bin/ostt"
configure_omarchy_agent_action "$HOME/bin/ostt"

[ "$(grep -c '^o.bind("ALT + SPACE"' "$XDG_CONFIG_HOME/hypr/bindings.lua")" -eq 1 ]
[ "$(grep -c '^o.bind("ALT + SHIFT + SPACE"' "$XDG_CONFIG_HOME/hypr/bindings.lua")" -eq 1 ]
[ "$(grep -c '^o.window({ title = "\^ostt\$" }' "$XDG_CONFIG_HOME/hypr/hyprland.lua")" -eq 1 ]
[ "$(grep -c '^\[process.actions.agent\]$' "$XDG_CONFIG_HOME/ostt/ostt.toml")" -eq 1 ]
grep -q 'setsid -f omarchy agent prompt' "$XDG_CONFIG_HOME/ostt/ostt.toml"
awk 'prev == "" && $0 == "[process.actions.agent]" && NR > 1 { found = 1 } { prev = $0 } END { exit !found }' "$XDG_CONFIG_HOME/ostt/ostt.toml"

printf '[audio]' >"$XDG_CONFIG_HOME/ostt/no-final-newline.toml"
append_config_block "$XDG_CONFIG_HOME/ostt/no-final-newline.toml" '[process.actions.agent]' >/dev/null
awk 'prev == "" && $0 == "[process.actions.agent]" && NR > 1 { found = 1 } { prev = $0 } END { exit !found }' "$XDG_CONFIG_HOME/ostt/no-final-newline.toml"

cat >"$XDG_CONFIG_HOME/hypr/conflicting-bindings.lua" <<'EOF'
o.bind('Alt + Space', 'Existing action', 'existing-command')
EOF
configure_omarchy_bindings "$HOME/bin/ostt" "$XDG_CONFIG_HOME/hypr/conflicting-bindings.lua"
grep -q "o.bind('Alt + Space', 'Existing action', 'existing-command')" "$XDG_CONFIG_HOME/hypr/conflicting-bindings.lua"
! grep -q '^o.bind("ALT + SPACE"' "$XDG_CONFIG_HOME/hypr/conflicting-bindings.lua"
[ "$(grep -c '^o.bind("ALT + SHIFT + SPACE"' "$XDG_CONFIG_HOME/hypr/conflicting-bindings.lua")" -eq 1 ]

cat >"$XDG_CONFIG_HOME/hypr/existing-window.lua" <<'EOF'
o.window({
  title = '^ostt$',
}, {
  float = true,
})
EOF
configure_omarchy_window "$XDG_CONFIG_HOME/hypr/existing-window.lua"
[ "$(grep -c '^o.window' "$XDG_CONFIG_HOME/hypr/existing-window.lua")" -eq 1 ]

# A failed validation with no pre-existing config must remove the file, not
# leave the invalid block behind.
rm -rf "$XDG_CONFIG_HOME/ostt"
cat >"$HOME/bin/ostt-invalid" <<'EOF'
#!/usr/bin/env bash
config="${XDG_CONFIG_HOME:-$HOME/.config}/ostt/ostt.toml"
if [ -f "$config" ] && grep -q 'process.actions.agent' "$config"; then exit 1; fi
exit 0
EOF
chmod +x "$HOME/bin/ostt-invalid"
configure_omarchy_agent_action "$HOME/bin/ostt-invalid" 2>/dev/null
[ ! -e "$XDG_CONFIG_HOME/ostt/ostt.toml" ]

REAL_OSTT="${OSTT_TEST_BIN:-$(command -v ostt 2>/dev/null || true)}"
if [ -n "$REAL_OSTT" ] && [ -x "$REAL_OSTT" ]; then
  rm -rf "$XDG_CONFIG_HOME/ostt"
  configure_omarchy_agent_action "$REAL_OSTT"
  "$REAL_OSTT" model current >/dev/null
  grep -q '^\[process.actions.agent\]$' "$XDG_CONFIG_HOME/ostt/ostt.toml"
fi

printf 'Omarchy installer configuration tests passed.\n'
