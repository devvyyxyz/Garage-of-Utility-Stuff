import type { Component } from 'svelte';
import {
	Files,
	LockOpen,
	ArrowDownAZ,
	Hash,
	Binary,
	Braces,
	Image,
	Archive,
	Server,
	Wrench,
	Settings
} from '@lucide/svelte';

export type ToolStatus = 'ok' | 'warn' | 'error';

export type Tool = {
	id: string;
	name: string;
	description: string;
	category: string;
	icon: Component;
	href: string;
	pinned?: boolean;
	status?: ToolStatus;
	keywords?: string[];
};

export const CATEGORIES = ['Files', 'Crypto', 'Text', 'Media', 'Dev', 'System'] as const;

export const TOOLS: Tool[] = [
	{
		id: 'file-converter',
		name: 'File Converter',
		description: 'Convert between common file formats.',
		category: 'Files',
		icon: Files,
		href: '/tools/file-converter',
		pinned: true,
		status: 'ok',
		keywords: ['convert', 'format', 'png', 'jpg', 'pdf']
	},
	{
		id: 'decrypt',
		name: 'Decrypt',
		description: 'Decrypt files and text with your keys.',
		category: 'Crypto',
		icon: LockOpen,
		href: '/tools/decrypt',
		pinned: true,
		status: 'ok',
		keywords: ['decrypt', 'encrypt', 'cipher', 'aes']
	},
	{
		id: 'sort-text',
		name: 'Sort Text',
		description: 'Sort lines in .txt and other text files.',
		category: 'Text',
		icon: ArrowDownAZ,
		href: '/tools/sort-text',
		pinned: true,
		status: 'ok',
		keywords: ['sort', 'lines', 'txt', 'organize']
	},
	{
		id: 'hash',
		name: 'Hash',
		description: 'Compute MD5, SHA-1, SHA-256 and more.',
		category: 'Crypto',
		icon: Hash,
		href: '/tools/hash',
		status: 'ok',
		keywords: ['hash', 'md5', 'sha256', 'checksum']
	},
	{
		id: 'base64',
		name: 'Base64',
		description: 'Encode and decode Base64 strings and files.',
		category: 'Text',
		icon: Binary,
		href: '/tools/base64',
		status: 'ok',
		keywords: ['base64', 'encode', 'decode']
	},
	{
		id: 'json-format',
		name: 'JSON Formatter',
		description: 'Pretty-print, validate and minify JSON.',
		category: 'Dev',
		icon: Braces,
		href: '/tools/json-format',
		status: 'ok',
		keywords: ['json', 'format', 'validate', 'pretty']
	},
	{
		id: 'image-resize',
		name: 'Image Resize',
		description: 'Resize and crop images in bulk.',
		category: 'Media',
		icon: Image,
		href: '/tools/image-resize',
		status: 'warn',
		keywords: ['image', 'resize', 'crop', 'bulk']
	},
	{
		id: 'archive',
		name: 'Archive',
		description: 'Create and extract zip/tar archives.',
		category: 'Files',
		icon: Archive,
		href: '/tools/archive',
		status: 'ok',
		keywords: ['zip', 'tar', 'archive', 'extract']
	},
	{
		id: 'system',
		name: 'System Info',
		description: 'CPU, memory, disk and runtime stats.',
		category: 'System',
		icon: Server,
		href: '/tools/system',
		status: 'ok',
		keywords: ['system', 'cpu', 'memory', 'disk', 'stats']
	}
];

export const pinnedTools = () => TOOLS.filter((t) => t.pinned);
export const recentTools = () => TOOLS.slice(0, 4);
export const toolsByCategory = () =>
	CATEGORIES.map((c) => ({ category: c, tools: TOOLS.filter((t) => t.category === c) })).filter(
		(g) => g.tools.length
	);

export const findTool = (id: string) => TOOLS.find((t) => t.id === id);
export const searchTools = (q: string) => {
	const needle = q.trim().toLowerCase();
	if (!needle) return TOOLS;
	return TOOLS.filter(
		(t) =>
			t.name.toLowerCase().includes(needle) ||
			t.description.toLowerCase().includes(needle) ||
			t.category.toLowerCase().includes(needle) ||
			(t.keywords ?? []).some((k) => k.includes(needle))
	);
};

// re-export for convenience
export { Wrench, Settings };
