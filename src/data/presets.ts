import { PresetPaper } from '../types';

export const PRESET_PAPERS: PresetPaper[] = [
  {
    id: 'transformer',
    title: 'Attention Is All You Need',
    shortTitle: 'Transformer (Self-Attention)',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, et al. (Google Brain & Research)',
    year: 2017,
    arxivUrl: 'https://arxiv.org/abs/1706.03762',
    badge: 'Foundational Landmark',
    summaryPreview: 'Replaced recurrent networks entirely with Multi-Head Self-Attention, enabling parallel sequence training.'
  },
  {
    id: 'mamba',
    title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
    shortTitle: 'Mamba (Selective SSM)',
    authors: 'Albert Gu, Tri Dao (Carnegie Mellon & Princeton)',
    year: 2023,
    arxivUrl: 'https://arxiv.org/abs/2312.00752',
    badge: 'O(N) Scaling',
    summaryPreview: 'Introduced input-dependent selective state spaces and hardware-aware associative scan with linear O(N) time complexity.'
  },
  {
    id: 'lora',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    shortTitle: 'LoRA (Parameter-Efficient PEFT)',
    authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, et al. (Microsoft Research)',
    year: 2021,
    arxivUrl: 'https://arxiv.org/abs/2106.09685',
    badge: 'Fine-Tuning Revolution',
    summaryPreview: 'Freezes pre-trained model weights and injects trainable rank decomposition matrices, reducing trainable parameters by 10,000x.'
  },
  {
    id: 'flashattention',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    shortTitle: 'FlashAttention (IO-Awareness)',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré (Stanford)',
    year: 2022,
    arxivUrl: 'https://arxiv.org/abs/2205.14135',
    badge: 'Systems Breakthrough',
    summaryPreview: 'Tiles attention computation across GPU SRAM and HBM to avoid reading/writing intermediate NxN attention matrices.'
  },
  {
    id: 'deepseek-v3',
    title: 'DeepSeek-V3 Technical Report',
    shortTitle: 'DeepSeek-V3 (Multi-Head Latent Attention)',
    authors: 'DeepSeek-AI',
    year: 2024,
    arxivUrl: 'https://arxiv.org/abs/2412.19437',
    badge: 'State-of-the-Art MoE',
    summaryPreview: 'Pioneers Multi-Head Latent Attention (MLA) for extreme KV cache compression and DeepSeekMoE architecture.'
  },
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    shortTitle: 'RAG (Retrieval-Augmented Gen)',
    authors: 'Patrick Lewis, Ethan Perez, Aleksandra Piktus, et al. (Meta AI, UCL, NYU)',
    year: 2020,
    arxivUrl: 'https://arxiv.org/abs/2005.11401',
    badge: 'Hybrid Information Retrieval',
    summaryPreview: 'Combines pre-trained parametric sequence-to-sequence models with non-parametric dense vector index retrieval.'
  }
];
