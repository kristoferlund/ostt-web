---
description: Enable GPU-accelerated local transcription with Metal on macOS, CUDA on NVIDIA Linux, and Vulkan on AMD and Intel Linux hardware.
---

# GPU Acceleration

Local transcription with Parakeet and Whisper models can run on your GPU. OSTT supports Metal on macOS, CUDA on NVIDIA Linux hardware, and Vulkan on AMD and Intel Linux hardware.

GPU acceleration only applies to local models. It has no effect on cloud providers.

## Backends

| Backend | Hardware | Platform |
| --- | --- | --- |
| Metal | Apple Silicon and Intel Mac | macOS |
| CUDA 12 | NVIDIA GPUs, compute capability 5.0 and newer | Linux x86_64 |
| CUDA 13 | NVIDIA GPUs, compute capability 7.5 and newer | Linux x86_64 |
| Vulkan | AMD, Intel, and NVIDIA GPUs | Linux x86_64 |

## macOS: Metal

Metal is enabled on every macOS build. No setup is needed.

The first transcription after installing or upgrading takes several seconds longer while macOS compiles the GPU kernels. macOS caches them, so later runs start immediately.

## Linux: NVIDIA (CUDA)

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

CUDA 13 cannot compile for Maxwell, Pascal, and Volta, so GTX 900
and GTX 10 series cards and the Titan V need the CUDA 12 build even on a system
whose toolkit is CUDA 13. The installer reads the compute capability from
`nvidia-smi` and will not select `cuda13` when the lowest-capability GPU in the
machine is below 7.5. When both a CUDA 12 and a CUDA 13 toolkit are installed
and the GPU supports both, the installer picks `cuda13`.

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

Rolling-release distributions such as Arch and CachyOS ship CUDA 13, so they
get the `cuda13` build. Distribution-packaged CUDA elsewhere is often older
than either build: Ubuntu 22.04's `nvidia-cuda-toolkit` is CUDA 11.5 and
24.04's is 12.0. A CUDA 11 machine matches neither build (see the fallback
rules below). NVIDIA's own apt repository has current CUDA 12 and 13.

To see which CUDA major version is installed:

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

To skip GPU detection and install the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

If an NVIDIA GPU is present but no matching CUDA toolkit is installed, the
installer picks the Vulkan build when the NVIDIA Vulkan driver is installed.
It looks for an NVIDIA ICD manifest in `/usr/share/vulkan/icd.d` and the other
standard ICD directories, because `libvulkan.so.1` on its own only proves the
Vulkan *loader* is present. A Vulkan build with no NVIDIA ICD behind it starts
normally and then runs on the CPU. Without the NVIDIA Vulkan driver, the
installer picks the CPU build, or the Vulkan build if an AMD or Intel GPU is
also present.

If the release being installed does not publish the selected build, the
installer says so and walks down the fallback chain: `cuda13` and `cuda` fall
back to `vulkan`, then `cpu`, and `vulkan` is skipped when no Vulkan driver is
usable. The version line shows which build you got:

```bash
ostt --version    # e.g. "ostt 0.0.30-vulkan"
```

## Linux: AMD and Intel (Vulkan)

The Vulkan build is available for Linux x86_64 and works on AMD and Intel GPUs via the Mesa driver stack. The Vulkan loader (`libvulkan.so.1`) is installed on most graphical Linux systems.

The install script detects AMD and Intel GPUs via `lspci` and installs the Vulkan build automatically:

```bash
curl -fsSL https://ostt.ai/install | bash
```

## Verify the Backend

With the [daemon](./daemon) running, `ostt daemon status` shows the backend:

```
Backend: CUDA0 (NVIDIA GeForce RTX 4080, 16376 MB)
```

Without the daemon, transcribe once with a local model, then check `ostt logs` for lines like:

```
local inference devices: cuda (NVIDIA GeForce RTX 4080), cpu (...)
local transcription: backend active: whisper model on CUDA0 (NVIDIA GeForce RTX 4080, 16376 MB)
```

The backend name is `MTL0` for Metal, `CUDA0` for CUDA, `Vulkan0` for Vulkan, and `CPU` when no GPU is used. For example:

```
local inference devices: metal (Apple M4 Pro), cpu (Apple M4 Pro)
local inference devices: vulkan (AMD Radeon Graphics (RADV REMBRANDT)), cpu (...)
```

## Manual Package Selection

If you install from `.deb`, `.rpm`, or direct release archives instead of the installer, choose the artifact that matches your hardware:

| Hardware | Debian/Ubuntu | Fedora/RHEL/openSUSE | Archive |
| --- | --- | --- | --- |
| CPU or Linux ARM64 | `ostt_<version>-1_amd64.deb` or `ostt_<version>-1_arm64.deb` | `ostt-<version>-1.x86_64.rpm` or `ostt-<version>-1.aarch64.rpm` | `ostt-<target>.tar.gz` |
| NVIDIA GPU, CUDA 12 toolkit installed | `ostt-cuda_<version>-1_amd64.deb` | `ostt-cuda-<version>-1.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-cuda.tar.gz` |
| NVIDIA GPU, CUDA 13 toolkit installed | `ostt-cuda13_<version>-1_amd64.deb` | `ostt-cuda13-<version>-1.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-cuda13.tar.gz` |
| AMD/Intel GPU with Vulkan runtime library | `ostt-vulkan_<version>-1_amd64.deb` | `ostt-vulkan-<version>-1.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-vulkan.tar.gz` |
| macOS | Homebrew or macOS archive | n/a | `ostt-x86_64-apple-darwin.tar.gz` or `ostt-aarch64-apple-darwin.tar.gz` |

Run `uname -m` to check your CPU architecture. CUDA and Vulkan artifacts are Linux x86_64 only. Use `ldconfig -p | grep libcublas.so` to pick between the `cuda` and `cuda13` artifacts.

## Troubleshooting {#cpu-fallback}

The CPU build runs on any Linux ARM64 machine and on x86-64 CPUs with AVX2, FMA, F16C, and BMI2: Intel Haswell (2013), AMD Zen, and newer. GPU builds can fail to accelerate in three ways.

**Missing runtime library.** If `libcuda.so.1` or `libvulkan.so.1` is not present, the binary fails to start with a shared library error. Install the required driver packages or reinstall with `--no-gpu`.

**Wrong CUDA major version.** An error like this means the CUDA build does not match the installed toolkit:

```
error while loading shared libraries: libcublas.so.12: cannot open shared object file
```

Check which major you have with `ldconfig -p | grep libcublas.so`, then reinstall with the matching build, for example `--gpu cuda13` for `libcublas.so.13`.

**Library present but no GPU device visible.** The binary starts and runs, but the inference engine cannot find a usable GPU and falls back to CPU inference. This is the most common cause of unexpectedly high CPU usage after installing a GPU build. Check `ostt logs` for a device list without a GPU and a model running on CPU:

```
local inference devices: cpu (AMD Ryzen 7 6800H with Radeon Graphics)
local transcription: backend active: whisper model on CPU (AMD Ryzen 7 6800H with Radeon Graphics, 27827 MB)
```

With the Vulkan build, this means the Vulkan loader is installed but the GPU driver ICD is missing. On Arch Linux, install the Mesa Vulkan driver for your hardware:

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

After installing the driver, restart the daemon if it is running:

```bash
ostt daemon restart
```

Then verify `ostt logs` shows your GPU device name and VRAM.
