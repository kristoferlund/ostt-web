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

The CUDA build requires:

- An NVIDIA GPU
- NVIDIA driver (`libcuda.so`)
- cuBLAS runtime (`libcublas.so`)

The install script detects NVIDIA hardware automatically and installs the CUDA build:

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

The Vulkan build works on AMD and Intel GPUs via the Mesa driver stack. `libvulkan.so.1` ships with Mesa on most graphical Linux installs, so no additional runtime dependencies are typically needed.

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

## Detection Priority

On Linux, if both NVIDIA and AMD/Intel GPUs are present, the install script selects the CUDA build. CUDA is faster for NVIDIA hardware than Vulkan.

## CPU Fallback

The CPU build works on all hardware. If you install the GPU build and the required runtime libraries are not present, the binary will fail to start. In that case, reinstall with `--no-gpu` or install the required driver packages.


