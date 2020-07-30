import { TOKEN } from '../../environments/environment';
import { User } from '../entities/user';

export function tokenExists(): boolean {
	const tk = localStorage.getItem(TOKEN.name);
	return !!tk && tk.indexOf(TOKEN.scheme) !== -1;
}

export function saveToken(token: string): void {
	localStorage.setItem(TOKEN.name, token);
}

export function getToken(): string {
	return localStorage.getItem(TOKEN.name);
}

export function saveInfo(userInfo: User) {
	sessionStorage.setItem(TOKEN.userInfo, JSON.stringify(userInfo));
}

export function getInfo(): User {
	return JSON.parse(sessionStorage.getItem(TOKEN.userInfo));
}

export function deleteToken(): void {
	if (tokenExists()) {
		localStorage.removeItem(TOKEN.name);
		sessionStorage.removeItem(TOKEN.userInfo);
	}
}
