import * as vscode from 'vscode';
import { divineWords } from './variableCorrector';
import { fixName } from './fixName';
import { LiteralRenameByLanguage, RenameByLanguage } from './languageSwitch';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "variablenamecorrector" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('variablenamecorrector.fixName', () => {
		fixName((oldName: string, languageId: string) => {
			const divined = divineWords(oldName);
	
			return RenameByLanguage(languageId, divined);
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('variablenamecorrector.fixLiteralName', () => {
		fixName((oldName: string, languageId: string) => {
			const divined = divineWords(oldName);
	
			return LiteralRenameByLanguage(languageId, divined);
		});
	}));
}

export function deactivate() { }


