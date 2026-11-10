#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export OSTT_INSTALLER_SOURCE_ONLY=1

# shellcheck source=../public/install
. "$ROOT/public/install"

sw_vers() {
  [ "$1" = "-productVersion" ]
  printf '%s\n' "$MACOS_TEST_VERSION"
}

# Older systems must get an actionable error, not a dyld crash or GPU fallback.
for MACOS_TEST_VERSION in 10.15.7 11.7.10 12.7.6 13.7.8 14.7.8; do
  if out="$(check_macos_version 2>&1)"; then
    printf 'Unexpectedly accepted macOS %s\n' "$MACOS_TEST_VERSION" >&2
    exit 1
  fi
  printf '%s\n' "$out" | grep -q 'requires macOS 15 (Sequoia) or later'
  printf '%s\n' "$out" | grep -Fq "running macOS ${MACOS_TEST_VERSION}"
  printf '%s\n' "$out" | grep -q 'Software Update'
  printf '%s\n' "$out" | grep -q -- '--no-gpu cannot bypass'
done

# Accept the minimum release, its updates, and newer macOS major versions.
for MACOS_TEST_VERSION in 15.0 15.7.1 26.0; do
  check_macos_version
done

MACOS_TEST_VERSION="unknown"
if out="$(check_macos_version 2>&1)"; then
  printf 'Unexpectedly accepted an unknown macOS version\n' >&2
  exit 1
fi
printf '%s\n' "$out" | grep -q 'could not determine the macOS version'

if out="$(
  sw_vers() { return 1; }
  check_macos_version 2>&1
)"; then
  printf 'Unexpectedly accepted a failed macOS version check\n' >&2
  exit 1
fi
printf '%s\n' "$out" | grep -q 'could not determine the macOS version with sw_vers'

# Fail before probing an already-installed (possibly crashing) binary,
# contacting GitHub, installing dependencies, or replacing an existing install.
uname() { printf 'Darwin\n'; }
check_prerequisites() { die 'test: reached prerequisites'; }
MACOS_TEST_VERSION="14.7.8"
if out="$(main 2>&1)"; then
  printf 'Unexpectedly installed on an unsupported macOS version\n' >&2
  exit 1
fi
printf '%s\n' "$out" | grep -q 'requires macOS 15'
! printf '%s\n' "$out" | grep -q 'test: reached prerequisites'

# Supported Macs must get past the platform gate into normal installation.
for MACOS_TEST_VERSION in 15.0 26.0; do
  if out="$(main 2>&1)"; then
    printf 'Unexpectedly passed the prerequisite test sentinel\n' >&2
    exit 1
  fi
  printf '%s\n' "$out" | grep -q 'test: reached prerequisites'
done

# The macOS gate must not reject Linux or query sw_vers there.
uname() { printf 'Linux\n'; }
sw_vers() { die 'test: queried macOS version on Linux'; }
if out="$(main 2>&1)"; then
  printf 'Unexpectedly passed the prerequisite test sentinel\n' >&2
  exit 1
fi
printf '%s\n' "$out" | grep -q 'test: reached prerequisites'
! printf '%s\n' "$out" | grep -q 'queried macOS version on Linux'

printf 'macOS installer compatibility tests passed.\n'
