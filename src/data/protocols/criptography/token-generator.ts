export interface TokenGenarator {
  generate(id: string): Promise<string>
}
