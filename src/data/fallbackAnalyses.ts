import { PaperAnalysis } from '../types';

export const FALLBACK_ANALYSES: Record<string, PaperAnalysis> = {
  transformer: {
    paperTitle: 'Attention Is All You Need',
    arxivId: '1706.03762',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Łukasz Kaiser', 'Illia Polosukhin'],
    published: '2017-06-12',
    url: 'https://arxiv.org/abs/1706.03762',
    wordCount: 238,
    coreConcept: {
      problemStatement: 'Existing sequence transduction models relied entirely on complex recurrent (RNN/LSTM) or convolutional neural networks. Recurrent architectures process tokens sequentially, creating an inherent computational bottleneck that precludes parallelization during training and struggles to maintain long-range dependencies.',
      primaryMethodology: 'The paper introduces the Transformer, an architecture eschewing recurrence entirely in favor of Multi-Head Self-Attention (MHA) and Feed-Forward Networks. Tokens attend simultaneously to all positions across key, query, and value projections, allowing constant-time O(1) path lengths between any pair of tokens regardless of sequence position.',
      keyBreakthroughs: 'Scaled Dot-Product Attention introduces a scaling factor 1/sqrt(d_k) to counteract vanishing gradients in high dimensions. Multi-Head Attention allows the model to jointly attend to information from different representation subspaces. Sinusoidal positional encodings inject sequence order without recurrence. This enables massive parallelization on GPU clusters, driving orders-of-magnitude faster training and superior BLEU scores.',
      plainSummary: 'Previous language models processed text word-by-word like a human reading slowly, which made training on modern GPUs painfully slow and caused models to forget early words in long paragraphs. The Transformer threw out sequential processing altogether. Instead, it lets every word look at every other word simultaneously through self-attention, weighing which words matter most. By multiplying by a scaling factor to keep math stable and splitting attention into multiple parallel "heads," the system trains dramatically faster on GPU clusters while setting new state-of-the-art translation records.'
    },
    mermaidFlowchart: `graph TD
  InputTokens["Input Tokens [B, L]"] --> InputEmbed["Input Embedding + Positional Encoding"]
  InputEmbed --> MultiHeadAttn["Multi-Head Self-Attention (Q, K, V)"]
  InputEmbed -.-> AddNorm1["Add & LayerNorm (Residual)"]
  MultiHeadAttn --> AddNorm1
  AddNorm1 --> FeedForward["Position-wise Feed-Forward Network [Linear-ReLU-Linear]"]
  AddNorm1 -.-> AddNorm2["Add & LayerNorm (Residual)"]
  FeedForward --> AddNorm2
  AddNorm2 --> EncOutput["Encoder Context Representations [B, L, D]"]
  
  TargetTokens["Target Tokens [B, L_out]"] --> TargetEmbed["Target Embedding + Positional Encoding"]
  TargetEmbed --> MaskedAttn["Masked Multi-Head Attention (Autoregressive)"]
  TargetEmbed -.-> AddNormDec1["Add & LayerNorm"]
  MaskedAttn --> AddNormDec1
  AddNormDec1 --> CrossAttn["Cross Multi-Head Attention (KV from Encoder, Q from Dec)"]
  EncOutput --> CrossAttn
  AddNormDec1 -.-> AddNormDec2["Add & LayerNorm"]
  CrossAttn --> AddNormDec2
  AddNormDec2 --> DecFFN["Decoder Feed-Forward Network"]
  AddNormDec2 -.-> AddNormDec3["Add & LayerNorm"]
  DecFFN --> AddNormDec3
  AddNormDec3 --> LinearProj["Linear Output Projection [D -> Vocab]"]
  LinearProj --> Softmax["Softmax Token Probabilities"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  InputTokens["Input Tokens [B, L]"] --> InputEmbed["Input Embedding + Positional Encoding"]
  InputEmbed --> MultiHeadAttn["Multi-Head Self-Attention (Q, K, V)"]
  InputEmbed -.-> AddNorm1["Add & LayerNorm (Residual)"]
  MultiHeadAttn --> AddNorm1
  AddNorm1 --> FeedForward["Position-wise Feed-Forward Network [Linear-ReLU-Linear]"]
  AddNorm1 -.-> AddNorm2["Add & LayerNorm (Residual)"]
  FeedForward --> AddNorm2
  AddNorm2 --> EncOutput["Encoder Context Representations [B, L, D]"]
  
  TargetTokens["Target Tokens [B, L_out]"] --> TargetEmbed["Target Embedding + Positional Encoding"]
  TargetEmbed --> MaskedAttn["Masked Multi-Head Attention (Autoregressive)"]
  TargetEmbed -.-> AddNormDec1["Add & LayerNorm"]
  MaskedAttn --> AddNormDec1
  AddNormDec1 --> CrossAttn["Cross Multi-Head Attention (KV from Encoder, Q from Dec)"]
  EncOutput --> CrossAttn
  AddNormDec1 -.-> AddNormDec2["Add & LayerNorm"]
  CrossAttn --> AddNormDec2
  AddNormDec2 --> DecFFN["Decoder Feed-Forward Network"]
  AddNormDec2 -.-> AddNormDec3["Add & LayerNorm"]
  DecFFN --> AddNormDec3
  AddNormDec3 --> LinearProj["Linear Output Projection [D -> Vocab]"]
  LinearProj --> Softmax["Softmax Token Probabilities"]`,
    studentOpportunities: [
      {
        id: 'opp-transformer-1',
        title: 'Lightweight Mamba Block Substitution for Edge LLM Inference',
        exactExtension: 'Replacing the quadratic O(N^2) multi-head self-attention layers with selective state space (Mamba) blocks while preserving pre-trained feed-forward weights for microcontrollers and mobile phones.',
        targetedMetric: '4.1x inference latency reduction at context length 4,096 tokens and 68% peak memory reduction on Raspberry Pi 5 / Apple Silicon.',
        recommendedTechStack: ['PyTorch', 'ONNX Runtime', 'Hugging Face Transformers', 'Triton'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Demonstrates deep understanding of state space alternatives to quadratic attention and real edge-device deployment.',
        resumeBullet: 'Architected hybrid Transformer-Mamba model replacing attention blocks; reduced 4K-token inference latency by 4.1x and peak VRAM by 68% using PyTorch & ONNX Runtime.',
        milestones: ['Week 1: Benchmark baseline NanoGPT on sequence lengths 512 to 8192', 'Week 2: Implement selective scan kernel and substitute attention layer', 'Week 3: Fine-tune on Wikitext-103 using knowledge distillation', 'Week 4: Export to ONNX and profile compute/memory bandwidth on target hardware']
      },
      {
        id: 'opp-transformer-2',
        title: 'Dynamic KV Cache Eviction via Attention Score Sparsity',
        exactExtension: 'Implementing an adaptive streaming KV cache compressor that identifies and prunes bottom 70% query-key attention scores during autoregressive generation.',
        targetedMetric: '70% reduction in KV cache memory footprint with under 0.8% perplexity degradation on long-form summarization.',
        recommendedTechStack: ['PyTorch', 'vLLM', 'CUDA / Triton', 'FlashAttention'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'Directly addresses the #1 production bottleneck in modern LLM serving (KV cache memory scaling).',
        resumeBullet: 'Engineered dynamic KV cache eviction algorithm in vLLM; compressed decoding memory by 70% while maintaining 99.2% summarization accuracy on Llama-3-8B.',
        milestones: ['Week 1: Instrument KV cache allocation in HuggingFace generation loop', 'Week 2: Implement top-k attention score eviction thresholding', 'Week 3: Write custom Triton eviction kernel to avoid host-device synchronization', 'Week 4: Run ablation tests against H2O and StreamingLLM benchmarks']
      },
      {
        id: 'opp-transformer-3',
        title: 'Speculative Decoding Draft Engine for Sub-10ms Token Latency',
        exactExtension: 'Building an ultra-compact 2-layer draft transformer model to hypothesize token sequences, verified in parallel by the target transformer in a single forward pass.',
        targetedMetric: '2.8x speedup in wall-clock tokens per second on consumer NVIDIA RTX 4060 GPU with mathematically identical outputs.',
        recommendedTechStack: ['PyTorch', 'TorchScript', 'HuggingFace', 'NumPy'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Speculative decoding is a foundational concept sought after by AI infrastructure teams at OpenAI, Meta, and Google.',
        resumeBullet: 'Implemented speculative decoding harness with lightweight draft model; accelerated target LLM generation by 2.8x with exact probability matching in PyTorch.',
        milestones: ['Week 1: Train a 2-layer draft model on target vocabulary', 'Week 2: Implement speculative verification loop with rejection sampling', 'Week 3: Measure acceptance rate across varying temperatures and prompts', 'Week 4: Publish GitHub repository with benchmarking harness and interactive CLI']
      }
    ],
    usage: {
      promptTokens: 1140,
      outputTokens: 1420,
      totalTokens: 2560,
      maxConstraint: 25000,
      efficiencyPercentage: 10
    }
  },
  mamba: {
    paperTitle: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
    arxivId: '2312.00752',
    authors: ['Albert Gu', 'Tri Dao'],
    published: '2023-12-01',
    url: 'https://arxiv.org/abs/2312.00752',
    wordCount: 246,
    coreConcept: {
      problemStatement: 'Transformers suffer from O(N^2) computational complexity and linear O(N) inference cost per step due to the growing KV cache. Prior structured state space models (SSMs) scaled linearly O(N), but lacked input-dependent selectivity—preventing them from filtering out irrelevant context or performing associative recall.',
      primaryMethodology: 'Mamba incorporates a time-varying selection mechanism into continuous state space models by making the parameters (B, C, and step size Delta) functions of the input token. To maintain computational feasibility, it integrates a hardware-aware associative scan algorithm executed directly in SRAM, bypassing slow HBM reads/writes.',
      keyBreakthroughs: 'Input selectivity allows the state space to dynamically compress relevant information and discard noise. The hardware-aware parallel scan computes the recurrence in O(N) time with zero HBM materialization of hidden states. Mamba matches or outperforms Transformers of equal size at up to 1M token contexts with 5x higher inference throughput.',
      plainSummary: 'Transformers are like students who re-read an entire textbook every time they want to write the next sentence—as books get longer, they slow to a crawl. Older linear models had fixed memory and could not choose what to remember. Mamba introduces selective state spaces: a system that dynamically decides what information to remember or forget based on the current word, just like taking smart notes. By writing a specialized GPU algorithm that does the math in ultra-fast local memory, Mamba scales linearly and runs 5 times faster than Transformers on long texts.'
    },
    mermaidFlowchart: `graph TD
  InputTokens["Input Tokens x [B, L, D]"] --> InProj["Linear In-Projection -> [B, L, 2*ED]"]
  InProj --> SplitPaths["Split into Twin Paths (x_branch, z_gate)"]
  SplitPaths --> Conv1D["1D Convolution [Kernel Size 4, SiLU]"]
  Conv1D --> Selectivity["Selective Parameter Projection: B(x), C(x), Delta(x)"]
  Selectivity --> DiscSSM["Discretization: A_bar = exp(Delta * A), B_bar = Delta * B"]
  DiscSSM --> HardwareScan["Hardware-Aware Parallel Associative Scan (SRAM Tiling)"]
  HardwareScan --> StateH["Updated Hidden State h_t = A_bar * h_{t-1} + B_bar * x_t"]
  StateH --> OutputProjC["Output Mapping y = C * h_t + D * x_t"]
  SplitPaths --> GateBranch["Gate Branch z: SiLU Activation"]
  OutputProjC --> MultiplicativeGate["Hadamard Elementwise Gating: y * silu(z)"]
  GateBranch --> MultiplicativeGate
  MultiplicativeGate --> OutProj["Linear Out-Projection -> [B, L, D]"]
  InputTokens -.-> ResidualAdd["Residual Add"]
  OutProj --> ResidualAdd
  ResidualAdd --> Output["Output Representation [B, L, D]"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  InputTokens["Input Tokens x [B, L, D]"] --> InProj["Linear In-Projection -> [B, L, 2*ED]"]
  InProj --> SplitPaths["Split into Twin Paths (x_branch, z_gate)"]
  SplitPaths --> Conv1D["1D Convolution [Kernel Size 4, SiLU]"]
  Conv1D --> Selectivity["Selective Parameter Projection: B(x), C(x), Delta(x)"]
  Selectivity --> DiscSSM["Discretization: A_bar = exp(Delta * A), B_bar = Delta * B"]
  DiscSSM --> HardwareScan["Hardware-Aware Parallel Associative Scan (SRAM Tiling)"]
  HardwareScan --> StateH["Updated Hidden State h_t = A_bar * h_{t-1} + B_bar * x_t"]
  StateH --> OutputProjC["Output Mapping y = C * h_t + D * x_t"]
  SplitPaths --> GateBranch["Gate Branch z: SiLU Activation"]
  OutputProjC --> MultiplicativeGate["Hadamard Elementwise Gating: y * silu(z)"]
  GateBranch --> MultiplicativeGate
  MultiplicativeGate --> OutProj["Linear Out-Projection -> [B, L, D]"]
  InputTokens -.-> ResidualAdd["Residual Add"]
  OutProj --> ResidualAdd
  ResidualAdd --> Output["Output Representation [B, L, D]"]`,
    studentOpportunities: [
      {
        id: 'opp-mamba-1',
        title: 'Mamba-Vision Hybrid Backbone for Real-time Video Stream Segmentation',
        exactExtension: 'Adapting Mamba bidirectional selective scan for 2D spatial-temporal frame tokens, replacing Vision Transformer (ViT) self-attention in high-frame-rate video segmentation.',
        targetedMetric: '3.6x FPS increase (from 24 FPS to 87 FPS) on embedded NVIDIA Jetson Orin with equivalent mIoU on ADE20K.',
        recommendedTechStack: ['PyTorch', 'TorchVision', 'Triton', 'TensorRT'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'Shows the ability to translate cutting-edge NLP state space breakthroughs into high-throughput computer vision systems.',
        resumeBullet: 'Developed Vision-Mamba backbone replacing attention in video segmentation; boosted edge inference from 24 to 87 FPS on NVIDIA Jetson while maintaining 48.2 mIoU.',
        milestones: ['Week 1: Implement 4-directional spatial SSM traversal kernel', 'Week 2: Replace ViT blocks in SegFormer architecture', 'Week 3: Benchmark latency across batch sizes 1 to 16 on Jetson', 'Week 4: Compile model with TensorRT and release demo repository']
      },
      {
        id: 'opp-mamba-2',
        title: 'INT4 Weight-Activation Quantization for Sub-GB Mamba On-Device Serving',
        exactExtension: 'Developing SmoothQuant-style activation scaling specifically tailored for the high dynamic range of Mamba discretization step-size Delta.',
        targetedMetric: 'Compress model size from 2.8 GB to 740 MB with under 0.6 perplexity shift on LM-Eval-Harness.',
        recommendedTechStack: ['PyTorch', 'AutoAWQ / BitsAndBytes', 'ONNX Runtime', 'C++'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Addresses non-trivial quantization hazards unique to continuous-time recurrence and state space parameters.',
        resumeBullet: 'Quantized Mamba-1.4B to INT4 using custom activation outlier suppression; shrank memory footprint by 73% to 740MB on mobile hardware.',
        milestones: ['Week 1: Profile parameter outlier distributions across A, B, C, and Delta matrices', 'Week 2: Implement post-training quantization calibration dataset', 'Week 3: Build custom GEMM kernel in C++ / ONNX Runtime', 'Week 4: Validate perplexity degradation against baseline FP16']
      },
      {
        id: 'opp-mamba-3',
        title: 'Hybrid Mamba-Transformer Speculative Verification Pipeline',
        exactExtension: 'Using a small linear Mamba model as an ultra-fast O(1) draft proposer coupled with a heavy Llama-3 Transformer verifier.',
        targetedMetric: '3.1x end-to-end token generation acceleration on 8K sequence lengths with zero output deviation.',
        recommendedTechStack: ['PyTorch', 'vLLM', 'HuggingFace', 'Transformers'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Combines the strengths of two distinct model paradigms to optimize the Pareto frontier of inference throughput.',
        resumeBullet: 'Engineered speculative drafting system pairing Mamba-370M with Llama-3-8B; accelerated 8K context token generation by 3.1x in vLLM.',
        milestones: ['Week 1: Align tokenizers between Mamba and Llama architectures', 'Week 2: Implement batched speculative verification loop', 'Week 3: Profile cache hits and rejection rates across diverse coding prompts', 'Week 4: Write technical report and benchmark suite']
      }
    ],
    usage: {
      promptTokens: 1220,
      outputTokens: 1480,
      totalTokens: 2700,
      maxConstraint: 25000,
      efficiencyPercentage: 11
    }
  },
  lora: {
    paperTitle: 'LoRA: Low-Rank Adaptation of Large Language Models',
    arxivId: '2106.09685',
    authors: ['Edward J. Hu', 'Yelong Shen', 'Phillip Wallis', 'Zeyuan Allen-Zhu', 'Yuanzhi Li', 'Shean Wang', 'Lu Wang', 'Weizhu Chen'],
    published: '2021-06-17',
    url: 'https://arxiv.org/abs/2106.09685',
    wordCount: 241,
    coreConcept: {
      problemStatement: 'Fine-tuning modern foundation models (LLMs) requires re-training and checkpointing all model weights (e.g. 175B parameters for GPT-3). This imposes massive VRAM memory overhead, prohibitively high storage costs for multiple downstream tasks, and substantial deployment friction.',
      primaryMethodology: 'LoRA freezes the pre-trained model weights W_0 and injects trainable rank decomposition matrices into the Transformer multi-head attention projection layers. For weight update Delta W, LoRA parameterizes it as Delta W = B * A, where B is [d x r] and A is [r x k] with rank r << min(d, k).',
      keyBreakthroughs: 'Because the intrinsic dimensionality of parameter updates is low, LoRA reduces trainable parameter count by 10,000x and GPU memory footprint by 3x. During inference, Delta W = (alpha/r) * B * A can be directly added back into W_0, introducing exactly zero inference latency overhead while matching or exceeding full fine-tuning performance.',
      plainSummary: 'Fine-tuning a giant language model used to mean making a complete duplicate copy of billions of parameters for every new task, requiring supercomputers and filling storage drives. LoRA realized that when adapting an existing model to a new task, you only need to change a tiny fraction of its internal subspace. By freezing the original weights and training two very skinny, low-rank helper matrices that multiply together, it slashes trainable parameters by 99.9% and memory by 3x. Best of all, at deployment time, the helper matrices merge right into the original weights with zero extra inference delay.'
    },
    mermaidFlowchart: `graph TD
  TokenInput["Input Activation x [B, L, d_in]"] --> FrozenW["Frozen Pre-Trained Weights W_0 [d_in, d_out]"]
  TokenInput --> LoRA_A["Trainable Down-Projection A [d_in, r] (Gaussian Init)"]
  LoRA_A --> LatentBottleneck["Low-Rank Intrinsic Subspace [B, L, r]"]
  LatentBottleneck --> LoRA_B["Trainable Up-Projection B [r, d_out] (Zero Init)"]
  LoRA_B --> ScalingFactor["Scaling Multiplier: (alpha / r)"]
  FrozenW --> AddNode["Tensor Addition: W_0 * x + (alpha/r) * B * A * x"]
  ScalingFactor --> AddNode
  AddNode --> OutActivation["Output Activation h [B, L, d_out]"]
  AddNode -.-> MergedDeploy["Deployment Mode: W_merged = W_0 + (alpha/r)*B*A"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  TokenInput["Input Activation x [B, L, d_in]"] --> FrozenW["Frozen Pre-Trained Weights W_0 [d_in, d_out]"]
  TokenInput --> LoRA_A["Trainable Down-Projection A [d_in, r] (Gaussian Init)"]
  LoRA_A --> LatentBottleneck["Low-Rank Intrinsic Subspace [B, L, r]"]
  LatentBottleneck --> LoRA_B["Trainable Up-Projection B [r, d_out] (Zero Init)"]
  LoRA_B --> ScalingFactor["Scaling Multiplier: (alpha / r)"]
  FrozenW --> AddNode["Tensor Addition: W_0 * x + (alpha/r) * B * A * x"]
  ScalingFactor --> AddNode
  AddNode --> OutActivation["Output Activation h [B, L, d_out]"]
  AddNode -.-> MergedDeploy["Deployment Mode: W_merged = W_0 + (alpha/r)*B*A"]`,
    studentOpportunities: [
      {
        id: 'opp-lora-1',
        title: 'Dynamic Rank-Adaptive SVD LoRA (AdaLoRA) on Consumer GPUs',
        exactExtension: 'Allocating rank parameter budgets dynamically across transformer layers using singular value decomposition magnitude pruning rather than uniform rank r across all layers.',
        targetedMetric: 'Match standard r=16 LoRA accuracy with 42% fewer trainable parameters on a single RTX 3060 (12GB VRAM).',
        recommendedTechStack: ['PyTorch', 'PEFT', 'Hugging Face', 'TRL'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Demonstrates understanding of parameter-budget allocation and matrix rank theory applied to LLMs.',
        resumeBullet: 'Implemented dynamic rank allocation for LoRA using SVD pruning; maintained 99.4% downstream accuracy on GSM8K with 42% fewer trainable parameters using PyTorch.',
        milestones: ['Week 1: Benchmark baseline LoRA (r=8, 16, 32) on Llama-3-8B', 'Week 2: Implement importance scoring based on singular value magnitudes', 'Week 3: Code iterative rank pruning loop during training', 'Week 4: Publish comparison benchmarks across GLUE and GSM8K']
      },
      {
        id: 'opp-lora-2',
        title: 'Multi-LoRA Dynamic Adapter Hot-Swapping Service',
        exactExtension: 'Building an asynchronous microservice that serves hundreds of tenant-specific LoRA adapters on a single GPU by caching adapter matrices in CPU RAM and swapping them into Triton kernels per request batch.',
        targetedMetric: 'Support 50+ concurrent customer tasks on 1 GPU with under 4ms adapter-swap latency overhead.',
        recommendedTechStack: ['PyTorch', 'vLLM', 'FastAPI', 'Triton'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'Solves real-world multi-tenant enterprise LLM serving challenges.',
        resumeBullet: 'Engineered multi-tenant LoRA hot-swapping server in vLLM; multiplexed 50 distinct task adapters on 1 GPU with sub-4ms routing overhead.',
        milestones: ['Week 1: Study S-LoRA and Punica multi-adapter batching schemes', 'Week 2: Write batch-segmented GEMM kernel in Triton', 'Week 3: Implement LRU adapter cache in host RAM', 'Week 4: Stress-test throughput with Locust benchmark suite']
      },
      {
        id: 'opp-lora-3',
        title: 'QLoRA Quantized NormalFloat4 Fine-Tuner for Coding Models',
        exactExtension: 'Quantizing base model to 4-bit NormalFloat (NF4) with double quantization, enabling fine-tuning of 14B coding models on a modest 8GB laptop GPU.',
        targetedMetric: 'Fine-tune DeepSeek-Coder-6.7B on 8GB VRAM with zero loss in pass@1 coding benchmark.',
        recommendedTechStack: ['PyTorch', 'BitsAndBytes', 'HuggingFace PEFT', 'Axolotl'],
        difficulty: 'Beginner',
        estimatedWeeks: 2,
        whyItImpresses: 'Accessible yet highly practical; exhibits fluency with modern quantization and efficient compute.',
        resumeBullet: 'Fine-tuned 7B coding LLM on an 8GB consumer GPU using QLoRA NF4 quantization; improved HumanEval pass@1 by 6.4% under strict memory constraints.',
        milestones: ['Week 1: Set up BitsAndBytes NF4 quantization and double quant', 'Week 2: Prepare Python code-repair instruction dataset', 'Week 3: Train for 3 epochs and monitor gradient norm stability', 'Week 4: Evaluate pass@1 score and document setup guide on GitHub']
      }
    ],
    usage: {
      promptTokens: 1110,
      outputTokens: 1390,
      totalTokens: 2500,
      maxConstraint: 25000,
      efficiencyPercentage: 10
    }
  },
  flashattention: {
    paperTitle: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    arxivId: '2205.14135',
    authors: ['Tri Dao', 'Daniel Y. Fu', 'Stefano Ermon', 'Atri Rudra', 'Christopher Ré'],
    published: '2022-05-27',
    url: 'https://arxiv.org/abs/2205.14135',
    wordCount: 248,
    coreConcept: {
      problemStatement: 'Standard self-attention computes an intermediate N x N attention matrix S = Q * K^T, writes it to High Bandwidth Memory (HBM), reads it back for Softmax, and writes it again before multiplying by V. Because GPU compute (FLOPs) is orders of magnitude faster than memory access, attention is heavily memory-bandwidth bound.',
      primaryMethodology: 'FlashAttention introduces an IO-aware algorithm that tiles inputs into blocks small enough to fit inside ultra-fast on-chip SRAM (192KB per SM). It computes exact softmax over tiles without materializing the full N x N matrix in HBM, leveraging online softmax scaling and recomputing attention during backward passes.',
      keyBreakthroughs: 'Online softmax rescaling computes partial max and sum statistics incrementally, updating running normalizers without ever saving the quadratic attention matrix to HBM. Memory accesses drop from O(N^2) to O(N^2 / SRAM_size), cutting HBM traffic by 5x-20x and accelerating training by 2x-4x with exact mathematical parity.',
      plainSummary: 'Standard attention is like a chef who runs back and forth to a distant walk-in freezer (HBM memory) every time they measure a single ingredient, leaving the stove sitting cold and idle. The math itself is fast, but the memory bottleneck kills performance. FlashAttention brings small batches of ingredients onto the kitchen counter (fast on-chip SRAM). Using clever math called online softmax, it computes the exact same result incrementally without ever writing giant intermediate tables to slow memory, making training 3 times faster and handling much longer documents.'
    },
    mermaidFlowchart: `graph TD
  SlowHBM["GPU High Bandwidth Memory (HBM - 80GB, ~2TB/s)"] --> LoadQKV["Tile Streaming: Load Q_i, K_j, V_j in Blocks [B_r, d]"]
  LoadQKV --> FastSRAM["On-Chip Fast SRAM (192KB per SM, ~19TB/s)"]
  FastSRAM --> LocalGEMM["Compute Tile S_ij = Q_i * K_j^T"]
  LocalGEMM --> OnlineSoftmax["Online Softmax: Track Running Max m_new & Sum l_new"]
  OnlineSoftmax --> RescaleAcc["Rescale Accumulated Output: O_i = diag(l_old/l_new) * O_i + P_ij * V_j"]
  RescaleAcc --> NextTileIter["Iterate Next K, V Tile Block"]
  NextTileIter -.->|Until All Sequence Tiles Completed| FastSRAM
  RescaleAcc --> WriteFinalHBM["Write Final Output O_i to HBM (Only O(N) IO!)"]
  WriteFinalHBM --> ModelOutput["Next Transformer Layer Activation"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  SlowHBM["GPU High Bandwidth Memory (HBM - 80GB, ~2TB/s)"] --> LoadQKV["Tile Streaming: Load Q_i, K_j, V_j in Blocks [B_r, d]"]
  LoadQKV --> FastSRAM["On-Chip Fast SRAM (192KB per SM, ~19TB/s)"]
  FastSRAM --> LocalGEMM["Compute Tile S_ij = Q_i * K_j^T"]
  LocalGEMM --> OnlineSoftmax["Online Softmax: Track Running Max m_new & Sum l_new"]
  OnlineSoftmax --> RescaleAcc["Rescale Accumulated Output: O_i = diag(l_old/l_new) * O_i + P_ij * V_j"]
  RescaleAcc --> NextTileIter["Iterate Next K, V Tile Block"]
  NextTileIter -.->|Until All Sequence Tiles Completed| FastSRAM
  RescaleAcc --> WriteFinalHBM["Write Final Output O_i to HBM (Only O(N) IO!)"]
  WriteFinalHBM --> ModelOutput["Next Transformer Layer Activation"]`,
    studentOpportunities: [
      {
        id: 'opp-fa-1',
        title: 'Custom Triton Implementation of FlashAttention-2 with Causal Masking',
        exactExtension: 'Writing an educational yet optimized FlashAttention kernel from scratch in OpenAI Triton, featuring online softmax tiling, warp-level tensor core scheduling, and causal triangular masking.',
        targetedMetric: 'Achieve >75% of official CUDA FlashAttention throughput on an NVIDIA RTX 4090 with pure Python/Triton.',
        recommendedTechStack: ['OpenAI Triton', 'PyTorch', 'NVIDIA Nsight Compute'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'Writing Triton kernels is one of the highest-leverage skills for systems ML engineering roles at top AI labs.',
        resumeBullet: 'Authored custom FlashAttention-2 Triton kernel with online softmax; reached 78% peak theoretical TFLOPs on NVIDIA RTX 4090 without C++/CUDA boilerplate.',
        milestones: ['Week 1: Implement naive online softmax in pure PyTorch', 'Week 2: Map tile block loops to Triton program ID grid', 'Week 3: Profile register spillage and SRAM bank conflicts using Nsight Compute', 'Week 4: Benchmark against PyTorch F.scaled_dot_product_attention']
      },
      {
        id: 'opp-fa-2',
        title: 'IO-Aware Cross-Attention for Stable Diffusion Latent Upscaling',
        exactExtension: 'Adapting FlashAttention tiling specifically for asymmetrical cross-attention where query sequences (image patches) are 16x longer than key-value sequences (text prompts).',
        targetedMetric: '2.4x latency reduction and 60% memory savings during high-res 1024x1024 diffusion denoising steps.',
        recommendedTechStack: ['PyTorch', 'Diffusers', 'Triton', 'ONNX Runtime'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Applies IO-awareness to generative computer vision pipelines where attention bottlenecks dominate.',
        resumeBullet: 'Optimized asymmetric cross-attention in Stable Diffusion pipeline using tiled SRAM loading; sped up 1024x1024 generation by 2.4x in PyTorch.',
        milestones: ['Week 1: Profile Diffusers UNet cross-attention execution profile', 'Week 2: Adjust block tiling dimensions for asymmetric Q vs KV lengths', 'Week 3: Integrate into SDXL generation loop', 'Week 4: Measure inference latency and visual fidelity metrics']
      },
      {
        id: 'opp-fa-3',
        title: 'Roofline Model Benchmarking Suite for GPU Memory Bandwidth',
        exactExtension: 'Creating a standalone benchmarking harness that plots real model attention layers against the GPU hardware Roofline (arithmetic intensity vs memory bandwidth limit).',
        targetedMetric: 'Pinpoint exact sequence length transition point where compute-bound transitions into memory-bound on diverse GPUs (T4, A10G, RTX 4090).',
        recommendedTechStack: ['Python', 'PyTorch', 'Matplotlib', 'NVIDIA NVML'],
        difficulty: 'Beginner',
        estimatedWeeks: 2,
        whyItImpresses: 'Demonstrates deep fundamental grasp of computer architecture, memory hierarchy, and quantitative systems profiling.',
        resumeBullet: 'Engineered hardware Roofline analysis suite profiling LLM attention layers across 4 GPU architectures; published interactive visualization package on GitHub.',
        milestones: ['Week 1: Calculate theoretical peak FLOPs and memory bandwidth for target GPU', 'Week 2: Measure operational intensity (FLOPs/byte) across sequence lengths', 'Week 3: Generate Roofline plots comparing standard vs FlashAttention', 'Week 4: Write documentation explaining hardware takeaways for new engineers']
      }
    ],
    usage: {
      promptTokens: 1180,
      outputTokens: 1450,
      totalTokens: 2630,
      maxConstraint: 25000,
      efficiencyPercentage: 11
    }
  },
  'deepseek-v3': {
    paperTitle: 'DeepSeek-V3 Technical Report',
    arxivId: '2412.19437',
    authors: ['DeepSeek-AI'],
    published: '2024-12-27',
    url: 'https://arxiv.org/abs/2412.19437',
    wordCount: 249,
    coreConcept: {
      problemStatement: 'Scaling Mixture-of-Experts (MoE) models to hundreds of billions of parameters faces critical bottlenecks: immense KV cache memory during decoding, routing collapse where select experts are overloaded, and communication overhead across GPU clusters during distributed All-to-All dispatch.',
      primaryMethodology: 'DeepSeek-V3 incorporates Multi-Head Latent Attention (MLA) to compress the KV cache into a low-dimensional latent vector via low-rank projections, and DeepSeekMoE with fine-grained expert segmentation, dynamic auxiliary-loss-free load balancing, and multi-token prediction (MTP) objectives.',
      keyBreakthroughs: 'MLA reduces the KV cache size by 93.3% compared to standard Multi-Head Attention, allowing massive concurrent batch sizes. The auxiliary-loss-free balancing dynamically adjusts routing bias terms without degrading model performance. FP8 mixed-precision training enables training a 671B model on modest hardware with top-tier reasoning capabilities.',
      plainSummary: 'Training and serving 600-billion parameter AI models usually requires millions of dollars in supercomputers because the memory needed to store past conversation context (the KV cache) blows up. DeepSeek-V3 solves this with two big inventions: First, it compresses the context memory by over 93% into skinny latent vectors so thousands of users can chat at once. Second, it splits its brain into hundreds of specialized mini-experts with a smart traffic cop that distributes questions evenly without slowing down the model, matching the smartest models in the world at a fraction of the cost.'
    },
    mermaidFlowchart: `graph TD
  InputTokens["Input Tokens [B, L]"] --> MLA_Block["Multi-Head Latent Attention (MLA)"]
  MLA_Block --> CompressKV["KV Compression Down-Projection -> Latent c_t^{KV}"]
  CompressKV --> CacheLatent["Compressed KV Cache (93.3% Smaller Storage!)"]
  MLA_Block --> DecoupledRoPE["Decoupled Rotary Position Embedding (RoPE)"]
  CacheLatent --> MLA_Output["MLA Attention Output"]
  DecoupledRoPE --> MLA_Output
  MLA_Output --> MoERouter["Auxiliary-Loss-Free MoE Router"]
  MoERouter --> SharedExp["1 Shared Expert (Always Active)"]
  MoERouter --> RoutedExp["Top-8 Selected Routed Experts (out of 256)"]
  SharedExp --> CombineOutput["Weighted Expert Aggregation"]
  RoutedExp --> CombineOutput
  CombineOutput --> MTP_Head["Multi-Token Prediction (MTP) Heads [t+1, t+2]"]
  CombineOutput --> FinalToken["Next Token Probability Distribution"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  InputTokens["Input Tokens [B, L]"] --> MLA_Block["Multi-Head Latent Attention (MLA)"]
  MLA_Block --> CompressKV["KV Compression Down-Projection -> Latent c_t^{KV}"]
  CompressKV --> CacheLatent["Compressed KV Cache (93.3% Smaller Storage!)"]
  MLA_Block --> DecoupledRoPE["Decoupled Rotary Position Embedding (RoPE)"]
  CacheLatent --> MLA_Output["MLA Attention Output"]
  DecoupledRoPE --> MLA_Output
  MLA_Output --> MoERouter["Auxiliary-Loss-Free MoE Router"]
  MoERouter --> SharedExp["1 Shared Expert (Always Active)"]
  MoERouter --> RoutedExp["Top-8 Selected Routed Experts (out of 256)"]
  SharedExp --> CombineOutput["Weighted Expert Aggregation"]
  RoutedExp --> CombineOutput
  CombineOutput --> MTP_Head["Multi-Token Prediction (MTP) Heads [t+1, t+2]"]
  CombineOutput --> FinalToken["Next Token Probability Distribution"]`,
    studentOpportunities: [
      {
        id: 'opp-dsv3-1',
        title: 'Mini-MLA: Multi-Head Latent Attention Implementation for Small Transformers',
        exactExtension: 'Refactoring a 1B parameter Llama or Mistral model to use DeepSeek Multi-Head Latent Attention (MLA) with decoupled rotary position embeddings.',
        targetedMetric: '90% reduction in KV cache size during batch 32 inference with < 1.0% perplexity shift.',
        recommendedTechStack: ['PyTorch', 'HuggingFace', 'Triton', 'vLLM'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'MLA is widely regarded as one of the most elegant architectural innovations in contemporary LLM systems.',
        resumeBullet: 'Architected Multi-Head Latent Attention (MLA) layer for 1B LLM; reduced active KV cache RAM by 90% during batched generation in PyTorch.',
        milestones: ['Week 1: Derive mathematical equations for down/up projection of key-value latents', 'Week 2: Implement decoupled RoPE query-key matching', 'Week 3: Benchmark memory consumption at 8K context length', 'Week 4: Profile generation throughput improvements on consumer GPU']
      },
      {
        id: 'opp-dsv3-2',
        title: 'Auxiliary-Loss-Free Dynamic Load Balancing for MoE',
        exactExtension: 'Implementing DeepSeek dynamic routing bias adjustment that tracks expert dispatch frequencies and updates routing scores without adding gradient-degrading auxiliary loss terms.',
        targetedMetric: 'Eliminate routing collapse across 16 experts while achieving 15% faster training convergence compared to Switch Transformer.',
        recommendedTechStack: ['PyTorch', 'DeepSpeed', 'Megatron-LM'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'Fixes the notorious expert-load imbalance problem that plagues open-source MoE architectures.',
        resumeBullet: 'Constructed auxiliary-loss-free routing engine for 16-expert MoE; eliminated expert collapse and improved training convergence by 15% in PyTorch.',
        milestones: ['Week 1: Build baseline Top-2 GShard router with load balancing loss', 'Week 2: Replace loss with running average frequency bias subtraction', 'Week 3: Evaluate token routing entropy across 10,000 steps', 'Week 4: Document ablation results in technical blog post']
      },
      {
        id: 'opp-dsv3-3',
        title: 'Multi-Token Prediction (MTP) Training Engine for Code Generation',
        exactExtension: 'Adding multi-token prediction heads that simultaneously predict token t+1 and token t+2, accelerating inference via speculative verification.',
        targetedMetric: '1.9x speedup in code autocompletion latency with 3.5% higher HumanEval pass@1.',
        recommendedTechStack: ['PyTorch', 'Transformers', 'Datasets', 'TorchScript'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Multi-token prediction is an active research area pioneered by Meta and DeepSeek to surpass autoregressive limits.',
        resumeBullet: 'Trained dual-head Multi-Token Prediction model on 500M code tokens; achieved 1.9x speculative decoding speedup on coding tasks in PyTorch.',
        milestones: ['Week 1: Add secondary prediction head sharing trunk embeddings', 'Week 2: Formulate dual cross-entropy loss with decay weighting', 'Week 3: Build greedy speculative accept/reject verifier', 'Week 4: Measure real-world IDE autocompletion latency']
      }
    ],
    usage: {
      promptTokens: 1250,
      outputTokens: 1510,
      totalTokens: 2760,
      maxConstraint: 25000,
      efficiencyPercentage: 11
    }
  },
  rag: {
    paperTitle: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    arxivId: '2005.11401',
    authors: ['Patrick Lewis', 'Ethan Perez', 'Aleksandra Piktus', 'Fabio Petroni', 'Vladimir Karpukhin', 'Naman Goyal', 'Heinrich Küttler', 'Mike Lewis', 'Wen-tau Yih', 'Tim Rocktäschel', 'Sebastian Riedel', 'Douwe Kiela'],
    published: '2020-05-22',
    url: 'https://arxiv.org/abs/2005.11401',
    wordCount: 236,
    coreConcept: {
      problemStatement: 'Large language models store factual knowledge implicitly within parameter weights. As a consequence, they hallucinate when questioned on niche domains, cannot cite verifiable sources, and require expensive full retraining whenever world knowledge changes.',
      primaryMethodology: 'RAG constructs a hybrid architecture combining a pre-trained parametric sequence-to-sequence model (BART/T5) with a non-parametric dense vector index (DPR over Wikipedia). The retriever finds top-k relevant text passages using Maximum Inner Product Search (MIPS), conditioning the generator on both question and retrieved documents.',
      keyBreakthroughs: 'RAG-Sequence and RAG-Token marginalize over retrieved documents to produce answers with grounding. The non-parametric index can be updated or swapped hot in real-time without modifying model weights, establishing the foundational paradigm for modern enterprise AI knowledge search.',
      plainSummary: 'Traditional AI models act like students taking an open-book exam without having the book in front of them—they try to memorize everything, and when they do not know an answer, they make something up. RAG gives the model an open book. When asked a question, a retriever searches a database of indexed documents for the best paragraphs and hands them to the generator. The model reads those excerpts to write an accurate answer with citations. If company info changes, you just update the documents without retraining the neural network.'
    },
    mermaidFlowchart: `graph TD
  UserQuery["User Query / Prompt x"] --> QueryEncoder["Dense Query Encoder (DPR - BERT)"]
  QueryEncoder --> VectorEmbedding["Query Vector q(x) [1, d]"]
  VectorEmbedding --> VectorDB["Vector Index / MIPS Search (FAISS - Millions of Passages)"]
  VectorDB --> TopKPassages["Top-K Retrieved Context Passages z_1 ... z_k"]
  UserQuery --> GeneratorPrompt["Concatenate: [Query x + Retrieved Context z]"]
  TopKPassages --> GeneratorPrompt
  GeneratorPrompt --> Seq2Seq["Parametric Generator (BART / T5 / Modern LLM)"]
  Seq2Seq --> Marginalization["RAG-Token / RAG-Sequence Probability Marginalization"]
  Marginalization --> FinalAnswer["Accurate Grounded Response with Source Citations"]`,
    flowchartLabeledSegment: `[FLOWCHART]
graph TD
  UserQuery["User Query / Prompt x"] --> QueryEncoder["Dense Query Encoder (DPR - BERT)"]
  QueryEncoder --> VectorEmbedding["Query Vector q(x) [1, d]"]
  VectorEmbedding --> VectorDB["Vector Index / MIPS Search (FAISS - Millions of Passages)"]
  VectorDB --> TopKPassages["Top-K Retrieved Context Passages z_1 ... z_k"]
  UserQuery --> GeneratorPrompt["Concatenate: [Query x + Retrieved Context z]"]
  TopKPassages --> GeneratorPrompt
  GeneratorPrompt --> Seq2Seq["Parametric Generator (BART / T5 / Modern LLM)"]
  Seq2Seq --> Marginalization["RAG-Token / RAG-Sequence Probability Marginalization"]
  Marginalization --> FinalAnswer["Accurate Grounded Response with Source Citations"]`,
    studentOpportunities: [
      {
        id: 'opp-rag-1',
        title: 'Hybrid Dense-Sparse Reciprocal Rank Fusion (BM25 + ColBERT)',
        exactExtension: 'Replacing single dense vector search with hybrid reciprocal rank fusion combining lexical BM25 and multi-vector late-interaction ColBERT for zero-shot legal/medical queries.',
        targetedMetric: '28% improvement in Mean Reciprocal Rank (MRR@10) on out-of-domain technical documentation with under 15ms retrieval latency.',
        recommendedTechStack: ['Python', 'Qdrant / Milvus', 'ColBERTv2', 'BM25'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Hybrid search is the industry gold standard for production search engines overcoming pure dense vector semantic drift.',
        resumeBullet: 'Engineered hybrid retrieval engine fusing BM25 with ColBERT late-interaction; improved MRR@10 by 28% on technical documentation queries in Python.',
        milestones: ['Week 1: Benchmark baseline dense bi-encoder vs BM25', 'Week 2: Implement Reciprocal Rank Fusion (RRF) algorithm', 'Week 3: Integrate late-interaction token scoring', 'Week 4: Evaluate on BEIR benchmark dataset']
      },
      {
        id: 'opp-rag-2',
        title: 'Speculative Corrective RAG (CRAG) with Self-Reflection',
        exactExtension: 'Building an active retrieval evaluator that scores retrieved passage relevance, automatically triggering web search fallback or query re-writing if confidence falls below threshold.',
        targetedMetric: 'Reduce hallucination rate from 18.4% to 3.1% on ambiguous knowledge-intensive questions.',
        recommendedTechStack: ['PyTorch', 'LangChain / LlamaIndex', 'vLLM', 'DuckDuckGo API'],
        difficulty: 'Intermediate',
        estimatedWeeks: 3,
        whyItImpresses: 'Demonstrates understanding of agentic self-correcting retrieval loops rather than passive naive RAG.',
        resumeBullet: 'Developed Corrective RAG pipeline with confidence thresholding; lowered hallucination rate by 83% on ambiguous queries using LlamaIndex & vLLM.',
        milestones: ['Week 1: Train small passage relevance classifier', 'Week 2: Implement query transformation and web fallback triggers', 'Week 3: Build automated evaluation suite with Ragas framework', 'Week 4: Host interactive demo on Hugging Face Spaces']
      },
      {
        id: 'opp-rag-3',
        title: 'GraphRAG: Knowledge Graph Extraction for Multi-Hop Reasoning',
        exactExtension: 'Extracting knowledge entities and relationships into an in-memory graph database, performing graph traversal before vector search to answer multi-hop questions.',
        targetedMetric: '3.4x higher accuracy on multi-hop questions requiring synthesis across 3+ distinct research papers.',
        recommendedTechStack: ['Python', 'NetworkX / Neo4j', 'FastAPI', 'HuggingFace'],
        difficulty: 'Advanced',
        estimatedWeeks: 4,
        whyItImpresses: 'GraphRAG is the frontier of enterprise intelligence over interconnected document corpuses.',
        resumeBullet: 'Architected GraphRAG engine integrating Neo4j knowledge graphs with vector search; achieved 3.4x accuracy gain on complex multi-hop synthesis queries.',
        milestones: ['Week 1: Extract entity-relation triples using lightweight LLM prompt', 'Week 2: Construct hierarchical community graph clusters', 'Week 3: Implement community summarization retrieval traversal', 'Week 4: Benchmark on HotpotQA multi-hop reasoning dataset']
      }
    ],
    usage: {
      promptTokens: 1100,
      outputTokens: 1380,
      totalTokens: 2480,
      maxConstraint: 25000,
      efficiencyPercentage: 10
    }
  }
};

