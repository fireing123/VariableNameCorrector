import * as vscode from 'vscode';
import { divineWords, toSnakeCase } from './variableCorrector';
import { fixName } from './fixName';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "variablenamecorrector" is now active!');

	const disposable = vscode.commands.registerCommand('variablenamecorrector.fixName', fixName);

	context.subscriptions.push(disposable);
}

export function deactivate() { }

