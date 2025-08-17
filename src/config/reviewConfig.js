// ===== CENTRALNA KONFIGURACJA BOTA - ZMIEŃ NA SWOJE ID! =====

module.exports = {
    // === PODSTAWOWE ID === 
    SERVER_ID: '1382630829536182302', // ID twojego serwera
    
    // === WŁAŚCICIELE === 
    OWNER_IDS: ['1325929696751255555', '1270723004770549920', '1370685546887643198'], // ID właścicieli serwera
    
    // === KANAŁY ===
    REVIEWS_CHANNEL_ID: '1382630833000812598', // Kanał gdzie wysyłane są wszystkie recenzje
    TOPKA_CHANNEL_ID: '1401240642637791242',   // Kanał #topka-supportu gdzie publikowany jest ranking
    PAYMENTS_CHANNEL_ID: '1382630832510074940', // Kanał payments
    VOUCHES_CHANNEL_ID: '1382630833000812597',  // Kanał vouches 
    PROOFS_CHANNEL_ID: 'https://silentmafia.pl/feedback',   // Link zewnętrzny do proofs
    REVIEWS_LINK_CHANNEL_ID: '1382630833000812598', // Kanał reviews (w linkach)
    
    // === UPRAWNIENIA === 
    ALLOWED_RANKING_USERS: ['1325929696751255555', '1270723004770549920', '1370685546887643198'], // Uprawnieni do /ranking-support
    ALLOWED_COMMAND_USERS: ['1325929696751255555', '1270723004770549920', '1370685546887643198'], // Uprawnieni do komend administracyjnych

    // === SERWERY Z KOMENDAMI ===
    COMMAND_GUILD_IDS: ['1382630829536182302'], // Serwery, na których rejestrowane są komendy Slash
    
    // === REP SYSTEM ===
    REP_USER_ID: '1382630829552963587', // ID użytkownika do +rep w komendzie /f
    
    // === KOMUNIKACJA ===
    MESSAGE_CREATE_IGNORE_ID: '1325929696751255555', // ID użytkownika ignorowanego w messageCreate
    
    // Harmonogram automatycznego rankingu
    RANKING_SCHEDULE: {
        DAY: 0,      // 0 = Niedziela, 1 = Poniedziałek, etc.
        HOUR: 20,    // Godzina (24h format)
        MINUTE: 0    // Minuta
    },
    
    // Ustawienia recenzji
    LOW_RATING_THRESHOLD: 2, // Oceny 1-2 wywołują powiadomienie właściciela
    MAX_COMMENT_LENGTH: 500, // Maksymalna długość komentarza
    
    // Ustawienia rankingu
    MAX_RANKING_POSITIONS: 10, // Ile pozycji pokazywać w rankingu
    MINIMUM_TICKETS_FOR_RANKING: 1, // Minimalna liczba ticketów żeby pojawić się w rankingu
    
    // === FUNKCJE POMOCNICZE ===
    getDiscordLink: function(channelId) {
        return `https://discord.com/channels/${this.SERVER_ID}/${channelId}`;
    },
    
    getPaymentsLink: function() {
        return this.getDiscordLink(this.PAYMENTS_CHANNEL_ID);
    },
    
    getVouchesLink: function() {
        return this.getDiscordLink(this.VOUCHES_CHANNEL_ID);
    },
    
    getProofsLink: function() {
        return 'https://silentmafia.pl/feedback';
    },
    
    getReviewsLink: function() {
        return this.getDiscordLink(this.REVIEWS_LINK_CHANNEL_ID);
    }
};
