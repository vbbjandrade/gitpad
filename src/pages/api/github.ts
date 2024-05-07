import { request } from "@octokit/request";
import { encode } from 'js-base64';

export const GET = async (file: string, sha?: string) => {
	return await request(`GET /repos/vbbjandrade/gitpad-pages/contents/${file}.txt${sha ? `?ref=${sha}` : ''}`, {
		headers: {
			authorization: `token ${import.meta.env.GITHUB_TOKEN}`
		}
	});
}

export const PUT = async (file: string, { content, sha, committer }: { content: string, sha?: string, committer?: string }) => {
	return await request(`PUT /repos/vbbjandrade/gitpad-pages/contents/${file}.txt`, {
		headers: {
			accept: 'application/vnd.github+json',
			authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
		},
		committer: {
			name: committer || 'GitPad User',
			email: 'user@gitpad.com',
			date: new Date().toISOString()
		},
		message: `${file}.txt updated.`,
		content: encode(content),
		sha
	});
}

export const GET_COMMIT = async (sha: string) => {
	return await request(`GET /repos/vbbjandrade/gitpad-pages/commits/${sha}`, {
		headers: {
			authorization: `token ${import.meta.env.GITHUB_TOKEN}`
		}
	});
}

export const GET_HISTORY = async (file: string, page?: number) => {
	return await request(`GET /repos/vbbjandrade/gitpad-pages/commits?path=${file}.txt&per_page=100&page=${page || 1}`, {
		headers: {
			authorization: `token ${import.meta.env.GITHUB_TOKEN}`
		}
	});
}

export const GET_RATE = async () => {
	return await request(`GET /rate_limit`, {
		headers: {
			authorization: `token ${import.meta.env.GITHUB_TOKEN}`
		}
	});
}