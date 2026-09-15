---
description: Enable GPU-accelerated local transcription with Metal on macOS, CUDA on NVIDIA Linux, and Vulkan on AMD and Intel Linux hardware.
---

# GPU Acceleration

Local transcription with Whisper models can use your GPU to significantly reduce transcription time. OSTT supports Metal on macOS, CUDA on NVIDIA Linux hardware, and Vulkan on AMD and Intel Linux hardware.

GPU acceleration has no effect on cloud providers — it only applies to local models.

## Backends

| Backend | Hardware | Platform |
| --- | --- | --- |
| Metal | Apple Silicon and Intel Mac | macOS |
| CUDA 12 | NVIDIA GPUs, compute capability 5.0 and newer | Linux x86_64 |
| CUDA 13 | NVIDIA GPUs, compute capability 7.5 and newer | Linux x86_64 |
| Vulkan | AMD, Intel, and NVIDIA GPUs | Linux x86_64 |

## macOS — Metal

Metal is enabled automatically on every macOS build. No setup is needed. When a local model runs, OSTT uses the GPU without any configuration.

Verify it is active in the logs:

```bash
ostt logs
```

Look for lines like:

```
daemon: loading model 'whisper/large-v3' with Metal GPU acceleration
daemon: backend active: Metal GPU acceleration using device(s): 0: Apple M2 Pro (16384 MB VRAM)
```

## Linux — NVIDIA (CUDA)

The CUDA build is available for Linux x86_64 and requires:

- An NVIDIA GPU
- NVIDIA driver (`libcuda.so.1`)
- cuBLAS and CUDA runtimes from a CUDA toolkit (`libcublas.so.<major>`, `libcudart.so.<major>`)

### CUDA 12 And CUDA 13 Builds

OSTT ships one build per CUDA major version, because the sonames differ
(`libcublas.so.12` versus `libcublas.so.13`) and are not interchangeable. A
binary built against CUDA 12 will not start on a machine that only has CUDA 13
installed, and vice versa.

| Build | Requires | GPU support |
| --- | --- | --- |
| `cuda` | CUDA 12.x toolkit | Maxwell and newer (compute capability 5.0+) |
| `cuda13` | CUDA 13.x toolkit | Turing and newer (compute capability 7.5+) |

CUDA 13 dropped offline compilation for Maxwell, Pascal, and Volta, so GTX 900
and GTX 10 series cards and the Titan V need the CUDA 12 build even on a system
whose toolkit is CUDA 13. The installer reads the compute capability from
`nvidia-smi` and will not select `cuda13` when the lowest-capability GPU in the
machine is below 7.5.

That check depends on `nvidia-smi` reporting the field. Older drivers do not
know `compute_cap`, and some virtualized and MIG configurations report `[N/A]`.
When the capability cannot be determined the installer does not block `cuda13`.
If you have a Maxwell, Pascal, or Volta card and your only toolkit is CUDA 13,
pass `--gpu vulkan` explicitly rather than relying on detection. (`--gpu cuda`
would not help: that build needs a CUDA 12 toolkit, which such a machine does
not have.)

To check what your driver reports:

```bash
nvidia-smi --query-gpu=name,compute_cap --format=csv
```

Distributions that track current CUDA — Arch, CachyOS, and other rolling
releases — ship CUDA 13, so they get the `cuda13` build. Distribution-packaged
CUDA elsewhere is often older than either build: Ubuntu 22.04's
`nvidia-cuda-toolkit` is CUDA 11.5 and 24.04's is 12.0, and a CUDA 11 machine
matches neither variant, so the installer falls through to Vulkan. Installing
from NVIDIA's own apt repository gets you a current CUDA 12 or 13.

Rather than trusting any of that, check your own machine:

```bash
ldconfig -p | grep libcublas.so
```

### Installing

The install script detects the NVIDIA driver, the installed CUDA major version,
and the GPU's compute capability, then installs the matching build:

```bash
curl -fsSL https://ostt.ai/install | bash
```

To force a specific build instead of detecting one:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --gpu cuda13
```

`--gpu` accepts `auto` (the default), `cuda`, `cuda13`, `vulkan`, or `cpu`. It
applies to Linux x86_64 only; macOS always uses Metal, and Linux ARM64 has no
GPU build.

To opt out of GPU detection and install the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

If an NVIDIA GPU is present but no matching CUDA toolkit is installed, the
installer falls back to the Vulkan build rather than the CPU build, provided
the NVIDIA Vulkan driver is installed too. It looks for an NVIDIA ICD manifest
in `/usr/share/vulkan/icd.d` and the other standard ICD directories, because
`libvulkan.so.1` on its own only proves the Vulkan *loader* is present — that
comes with Mesa and with most desktop packages, and a Vulkan build with no
NVIDIA ICD behind it starts normally and then runs on the CPU.

If the release being installed does not publish the build that was selected,
the installer says so and installs the next one down, so the build you end up
with may not be the one detection chose. The version line reports which:

```bash
ostt --version    # e.g. "ostt 0.0.25-vulkan"
```

Verify CUDA is active:

```bash
ostt logs
```

Look for lines like:

```
daemon: loading model 'whisper/large-v3' with CUDA GPU acceleration
daemon: backend active: CUDA GPU acceleration using device(s): 0: NVIDIA GeForce RTX 4080 (16384 MB VRAM)
```

## Linux — AMD and Intel (Vulkan)

The Vulkan build is available for Linux x86_64 and works on AMD and Intel GPUs via the Mesa driver stack. `libvulkan.so.1` ships with Mesa on most graphical Linux installs, so no additional runtime dependencies are typically needed.

The install script detects AMD and Intel GPUs via `lspci` and installs the Vulkan build automatically:

```bash
curl -fsSL https://ostt.ai/install | bash
```

To opt out of GPU detection and install the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

Verify Vulkan is active:

```bash
ostt logs
```

Look for lines like:

```
daemon: loading model 'whisper/large-v3' with Vulkan GPU acceleration
daemon: backend active: Vulkan GPU acceleration using device(s): 0: AMD Radeon RX 7900 XTX (24576 MB VRAM)
```

## Manual Package Selection

If you install from `.deb`, `.rpm`, or direct release archives instead of the installer, choose the artifact that matches your hardware:

| Hardware | Debian/Ubuntu | Fedora/RHEL/openSUSE | Archive |
| --- | --- | --- | --- |
| CPU or Linux ARM64 | `ostt_<version>_amd64.deb` or `ostt_<version>_arm64.deb` | `ostt-<version>.x86_64.rpm` or `ostt-<version>.aarch64.rpm` | `ostt-<target>.tar.gz` |
| NVIDIA GPU, CUDA 12 toolkit installed | `ostt-cuda_<version>_amd64.deb` | `ostt-cuda-<version>.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-cuda.tar.gz` |
| NVIDIA GPU, CUDA 13 toolkit installed | `ostt-cuda13_<version>_amd64.deb` | `ostt-cuda13-<version>.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-cuda13.tar.gz` |
| AMD/Intel GPU with Vulkan runtime library | `ostt-vulkan_<version>_amd64.deb` | `ostt-vulkan-<version>.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-vulkan.tar.gz` |
| macOS | Homebrew or macOS archive | n/a | `ostt-x86_64-apple-darwin.tar.gz` or `ostt-aarch64-apple-darwin.tar.gz` |

Run `uname -m` to check your CPU architecture. CUDA and Vulkan artifacts are currently Linux x86_64 only.

To see which CUDA major version is installed, so you can pick between the `cuda`
and `cuda13` artifacts:

```bash
ldconfig -p | grep libcublas.so
```

## Detection Priority

On Linux, if both NVIDIA and AMD/Intel GPUs are present, the install script selects a CUDA build. CUDA is faster for NVIDIA hardware than Vulkan.

When both a CUDA 12 and a CUDA 13 toolkit are installed, the installer prefers
`cuda13`, unless the GPU's compute capability is below 7.5, in which case only
`cuda` can run.

## CPU Fallback

The CPU build runs on any Linux ARM64 machine and on x86-64 CPUs with AVX2, FMA, and F16C — Intel Haswell (2013) and AMD Zen and newer. GPU builds can fail to accelerate in two distinct ways:

**Missing runtime library** — if `libcuda.so.1` or `libvulkan.so.1` is not present, the binary fails to start with a shared library error. Install the required driver packages or reinstall with `--no-gpu`.

**Wrong CUDA major version** — an error like this means the CUDA build does not match the installed toolkit:

```
error while loading shared libraries: libcublas.so.12: cannot open shared object file
```

Check which major you have with `ldconfig -p | grep libcublas.so`, then reinstall with the matching build, for example `--gpu cuda13` for `libcublas.so.13`.

**Library present but no GPU device visible** — the binary starts and runs, but whisper.cpp cannot find a usable GPU and silently falls back to CPU inference. This is the most common cause of unexpectedly high CPU usage after installing a GPU build. Check `ostt logs` for:

```
daemon: backend active: Vulkan GPU acceleration requested, but no GPU devices were reported by ggml
```

This means the Vulkan loader is installed but the GPU driver ICD is missing. On Arch Linux, install the Mesa Vulkan driver for your hardware:

```bash
sudo pacman -S vulkan-radeon    # AMD
sudo pacman -S vulkan-intel     # Intel
```

On Debian/Ubuntu:

```bash
sudo apt install mesa-vulkan-drivers
```

On Fedora:

```bash
sudo dnf install mesa-vulkan-drivers
```

After installing the driver, restart the daemon:

```bash
ostt daemon restart
```

Then verify `ostt logs` shows your GPU device name and VRAM.

