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
| CUDA | NVIDIA GPUs | Linux x86_64 |
| Vulkan | AMD and Intel GPUs | Linux x86_64 |

## macOS — Metal

Metal is enabled automatically on every macOS build. No setup is needed. When a local model runs, OSTT uses the GPU without any configuration.

Verify it is active in the logs:

```bash
ostt logs
```

Look for:

```
local transcription: Metal GPU acceleration enabled
```

## Linux — NVIDIA (CUDA)

The CUDA build is available for Linux x86_64 and requires:

- An NVIDIA GPU
- NVIDIA driver (`libcuda.so`)
- cuBLAS runtime (`libcublas.so`)

The install script detects usable NVIDIA CUDA support automatically and installs the CUDA build:

```bash
curl -fsSL https://ostt.ai/install | bash
```

To opt out of GPU detection and install the CPU build:

```bash
curl -fsSL https://ostt.ai/install | bash -s -- --no-gpu
```

Verify CUDA is active:

```bash
ostt logs
```

Look for:

```
local transcription: CUDA GPU acceleration enabled
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

Look for:

```
local transcription: Vulkan GPU acceleration enabled
```

## Manual Package Selection

If you install from `.deb`, `.rpm`, or direct release archives instead of the installer, choose the artifact that matches your hardware:

| Hardware | Debian/Ubuntu | Fedora/RHEL/openSUSE | Archive |
| --- | --- | --- | --- |
| CPU or Linux ARM64 | `ostt_latest_amd64.deb` or `ostt_latest_arm64.deb` | `ostt-latest.x86_64.rpm` or `ostt-latest.aarch64.rpm` | `ostt-<target>.tar.gz` |
| NVIDIA GPU with CUDA runtime libraries | `ostt-cuda_latest_amd64.deb` | `ostt-cuda-latest.x86_64.rpm` | `ostt-x86_64-unknown-linux-gnu-cuda.tar.gz` |
| AMD/Intel GPU with Vulkan runtime library | `ostt-vulkan_latest_amd64.deb` | `ostt-vulkan-latest.x86_64.rpm` | `ostt-x86_64-unknown-linux-gnu-vulkan.tar.gz` |
| macOS | Homebrew or macOS archive | n/a | `ostt-x86_64-apple-darwin.tar.gz` or `ostt-aarch64-apple-darwin.tar.gz` |

Run `uname -m` to check your CPU architecture. CUDA and Vulkan artifacts are currently Linux x86_64 only.

## Detection Priority

On Linux, if both NVIDIA and AMD/Intel GPUs are present, the install script selects the CUDA build. CUDA is faster for NVIDIA hardware than Vulkan.

## CPU Fallback

The CPU build works on all hardware. If you install the GPU build and the required runtime libraries are not present, the binary will fail to start. In that case, reinstall with `--no-gpu` or install the required driver packages.

