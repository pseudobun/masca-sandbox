export const formatDid = (issuer: string) => {
    if (issuer.startsWith('did:ens')) {
        return issuer.split(':').slice(-1);
    }
    const parts = issuer.split(':');
    const didMethod = parts.slice(0, -1).join(':');
    const identifier = parts.slice(-1)[0];
    const formattedIdentifier = identifier.startsWith('0x')
        ? formatAddress(identifier)
        : identifier.length <= 8
            ? identifier
            : `${identifier.slice(0, 4)}...${identifier.slice(-4)}`;
    return `${didMethod}:${formattedIdentifier}`;
};

export const formatAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
};