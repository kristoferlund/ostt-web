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

Look for lines like:

```
daemon: loading model 'whisper/large-v3' with Metal GPU acceleration
daemon: backend active: Metal GPU acceleration using device(s): 0: Apple M2 Pro (16384 MB VRAM)
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
| NVIDIA GPU with CUDA runtime libraries | `ostt-cuda_<version>_amd64.deb` | `ostt-cuda-<version>.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-cuda.tar.gz` |
| AMD/Intel GPU with Vulkan runtime library | `ostt-vulkan_<version>_amd64.deb` | `ostt-vulkan-<version>.x86_64.rpm` | `ostt-<version>-x86_64-unknown-linux-gnu-vulkan.tar.gz` |
| macOS | Homebrew or macOS archive | n/a | `ostt-x86_64-apple-darwin.tar.gz` or `ostt-aarch64-apple-darwin.tar.gz` |

Run `uname -m` to check your CPU architecture. CUDA and Vulkan artifacts are currently Linux x86_64 only.

## Detection Priority

On Linux, if both NVIDIA and AMD/Intel GPUs are present, the install script selects the CUDA build. CUDA is faster for NVIDIA hardware than Vulkan.

## CPU Fallback

The CPU build works on all hardware. GPU builds can fail to accelerate in two distinct ways:

**Missing runtime library** — if `libcuda.so` or `libvulkan.so.1` is not present, the binary fails to start with a shared library error. Install the required driver packages or reinstall with `--no-gpu`.

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

