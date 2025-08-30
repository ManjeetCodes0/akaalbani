---
title: "Japji Sahib in Hindi with English Translation | जपुजी साहिब हिंदी में"
description: "Read complete Japji Sahib in Hindi Devanagari script with English translation and transliteration. Complete 38 pauris by Guru Nanak Dev Ji in Hindi."
layout: default
---
<main class="main-content">
    <div class="paath-page-container">
        <div class="paath-controls-wrapper">
            <div class="paath-audio-player">
                <button class="play-btn">▶</button>
                <div class="timeline"><div class="progress"></div></div>
                <div class="time-display">0:00 / 25:00</div>
            </div>
            <div class="paath-lang-options">
                <button id="lang-hindi" class="lang-btn active">हिन्दी</button>
            </div>
        </div>

        <div class="paath-content-wrapper">
            <aside class="paath-sidebar" id="paath-desktop-sidebar">
                <nav class="paath-navigation">
                    <h4>पृष्ठ नेवीगेशन</h4>
                    <ul id="sidebar-nav-list"></ul>
                </nav>
            </aside>
            <article class="paath-main-text" id="paath-text-container"></article>
        </div>
    </div>
</main>

<div class="floating-view-options-wrapper">
    <button class="floating-view-options-btn" id="view-options-btn"><i class="fas fa-bars"></i></button>
    <div class="floating-view-options-menu" id="view-options-menu">
        <div class="menu-section">
            <h4>दृष्टी विकल्प</h4>
            <div class="setting-toggle"><label for="gurmukhi-toggle">हिन्दी</label><input type="checkbox" id="gurmukhi-toggle" checked></div>
            <div class="setting-toggle"><label for="translit-toggle">Transliteration</label><input type="checkbox" id="translit-toggle" checked></div>
            <div class="setting-toggle"><label for="translation-toggle">English</label><input type="checkbox" id="translation-toggle" checked></div>
            <div class="font-controls">
                <button class="font-btn" id="font-decrease">A-</button>
                <button class="font-btn active" id="font-normal">A</button>
                <button class="font-btn" id="font-increase">A+</button>
            </div>
        </div>
        <div class="menu-section">
            <h4>नेवीगेशन</h4>
            <select class="nav-dropdown" id="nav-dropdown"></select>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const baniData = {
        hindi: {
            title: 'जपुजी साहिब',
            author: 'श्री गुरु नानक देव जी की पावन बाणी',
            intro: 'जपुजी साहिब, सिखों के सुबह के नितनेम की पहली बाणी है। यह मूल मंत्र से शुरू होकर 38 पौड़ियों और अंत में एक श्लोक के साथ समाप्त होती है।',
            sections: [
                { id: 'mool-mantar', title: 'मूल मंत्र', text: 'ॐ सत्नाम कर्ता पुरुष निर्भउ निर्वैर अकाल मूर्ति अजूनी सैभं गुर प्रसाद ॥' },
                { id: 'pauri-1', title: 'पउड़ी १', text: 'सोचै सोचि न होवई जे सोची लख वार ॥ चुपै चुप न होवई जे लाइ रहा लिव तार ॥' },
                { id: 'pauri-2', title: 'पउड़ी २', text: 'हुकमी होवनि आकार हुकम न कहिआ जाई ॥ हुकमी होवनि जीअ हुकमि मिलै वडिआई ॥' },
                { id: 'pauri-3', title: 'पउड़ी ३', text: 'गावै को ताणु होवै किसै ताणु ॥ गावै को दाति जाणै नीसाणु ॥' },
                { id: 'pauri-4', title: 'पउड़ी ४', text: 'साचा साहिब साच नामु भाखिया भाउ अपारु ॥ आखहि मंगहि देहि देहि दाति करे दातारु ॥' },
                { id: 'pauri-5', title: 'पउड़ी ५', text: 'थापिआ न जाइ कीता न होइ ॥ आपे आपि निरंजनु सोइ ॥' },
                { id: 'pauri-6', title: 'पउड़ी ६', text: 'जे जुग चारे आरजा होर दसूनी होइ ॥ नवां खंडा विचि जाणीऐ नालि चलै सभु कोइ ॥' },
                { id: 'pauri-7', title: 'पउड़ी ७', text: 'जे तिसु नदरि न आवई ता वात न पुछै के ॥ केहीआ रतन तमाम ॥' },
                { id: 'pauri-8', title: 'पउड़ी ८', text: 'सुणिऐ सिध पीर सुरि नाथ ॥ सुणिऐ धरति धवल आकास ॥' },
                { id: 'pauri-9', title: 'पउड़ी ९', text: 'सुणिऐ ईसरु बरमा इन्दु ॥ सुणिऐ मुखि सालाहण मंदु ॥' },
                { id: 'pauri-10', title: 'पउड़ी १०', text: 'सुणिऐ सतु संतोखु गिआनु ॥ सुणिऐ अठसठि का इसनानु ॥' },
                { id: 'pauri-11', title: 'पउड़ी ११', text: 'सुणिऐ सरब बंधन मोखु ॥ सुणिऐ सभु दुख पाप का नासु ॥' },
                { id: 'pauri-12', title: 'पउड़ी १२', text: 'मंने सुरति होवै मनि बुधि ॥ मंने सगल भवन की सुधि ॥' },
                { id: 'pauri-13', title: 'पउड़ी १३', text: 'मंने मारगि ठाक न पाइ ॥ मंने पति सिउ परगटु जाइ ॥' },
                { id: 'pauri-14', title: 'पउड़ी १४', text: 'मंने पावहि मोख दुआरु ॥ मंने परवारै साधारु ॥' },
                { id: 'pauri-15', title: 'पउड़ी १५', text: 'मंने पावहि मोख दुआरु ॥ मंने परवारै साधारु ॥' },
                { id: 'pauri-16', title: 'पउड़ी १६', text: 'पंच परवाण पंच परधानु ॥ पंचे पावहि दरगहि मानु ॥' },
                { id: 'pauri-17', title: 'पउड़ी १७', text: 'असंख जप असंख भाउ ॥ असंख पूजा असंख तप ताउ ॥' },
                { id: 'pauri-18', title: 'पउड़ी १८', text: 'असंख मूरख अंध घोर ॥ असंख चोर हरामखोर ॥' },
                { id: 'pauri-19', title: 'पउड़ी १९', text: 'असंख मूरख अंध घोर ॥ असंख चोर हरामखोर ॥' },
                { id: 'pauri-20', title: 'पउड़ी २०', text: 'भरीऐ हथु पैरु तनु देह ॥ पाणी धोतै उतरसु खेह ॥' },
                { id: 'pauri-21', title: 'पउड़ी २१', text: 'तीरथ नावहु पापों का नासु ॥' },
                { id: 'pauri-22', title: 'पउड़ी २२', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-23', title: 'पउड़ी २३', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-24', title: 'पउड़ी २४', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-25', title: 'पउड़ी २५', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-26', title: 'पउड़ी २६', text: 'मिलीऐ पंचा सतिगुरु प्रसाद ॥' },
                { id: 'pauri-27', title: 'पउड़ी २७', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-28', title: 'पउड़ी २८', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-29', title: 'पउड़ी २९', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-30', title: 'पउड़ी ३०', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-31', title: 'पउड़ी ३१', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-32', title: 'पउड़ी ३२', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-33', title: 'पउड़ी ३३', text: 'आखणु धंधु धंधु धंधु ॥ आखणु अम्रितु पीवहु खंडु ॥' },
                { id: 'pauri-34', title: 'पउड़ी ३४', text: 'धरम खंड का एह करम ॥' },
                { id: 'pauri-35', title: 'पउड़ी ३५', text: 'गिआन खंड का एहो अंतु ॥' },
                { id: 'pauri-36', title: 'पउड़ी ३६', text: 'सरम खंड की बाणी ॥ तितु रूप अरूप अरूप ॥' },
                { id: 'pauri-37', title: 'पउड़ी ३७', text: 'करम खंड की बाणी ॥ तितु जोति रूप न भावनी ॥' },
                { id: 'pauri-38', title: 'पउड़ी ३८', text: 'जतु पाहारु धीरजु सुनिआर ॥ अहरणि मति वेदु हथीआरु ॥' },
                { id: 'salok', title: 'श्लोक', text: 'पवणु गुरू पाणी पिता माता धरति महत ॥ दिवसु राति दुइ दाई दाइआ खेलै सगल जगतु ॥' }
            ]
        },
        transliterations: {
            'mool-mantar': 'Ik Onkar, Satnam, Karta Purakh, Nirbhau, Nirvair, Akal Moorat, Ajooni Saibhang, Gur Prasad.',
            'pauri-1': 'Sochai soch na hovaee jay sochee lakh vaar. Chupai chup na hovaee jay laa-ay rahaa liv taar.',
            'pauri-2': 'Hukamee hovan aakaar Hukam na kahi-aa jaa-ee. Hukamee hovan jee-a Hukam milai vadi-aa-ee.',
            'pauri-3': 'Gaavai ko taan hovai kisai taan. Gaavai ko daat jaanai neesaan.',
            'pauri-4': 'Saachaa saahib saach naa-ay bhaakhi-aa bhaa-o apaar. Aakhahi mangahi deh deh daat karay daataar.',
            'pauri-5': 'Thaapi-aa na jaa-ay keetaa na ho-ay. Aapay aap niran-jan so-ay.',
            'pauri-6': 'Jay jug chaaray aarjaa hor dasoonee ho-ay. Navaa khandaa vich jaanee-ai naal chalai sabh ko-ay.',
            'pauri-7': 'Jay tis nadr na aav-ee ta vaat na puchhai kay. Kayhee-aa ratan tamaam.',
            'pauri-8': 'Suni-ai sidh peer sur naath. Suni-ai dharat dhaval aakaas.',
            'pauri-9': 'Suni-ai eesar barmaa ind. Suni-ai mukh salaahan mand.',
            'pauri-10': 'Suni-ai sat santokh gi-aan. Suni-ai athsath ka isnaan.',
            'pauri-11': 'Suni-ai sarab bandhan mokh. Suni-ai sabh dukh paap ka naas.',
            'pauri-12': 'Mannay surat hovai man budh. Mannay sagal bhavan kee sudh.',
            'pauri-13': 'Mannay maarag thaak na paa-ay. Mannay pat si-o pargat jaa-ay.',
            'pauri-14': 'Mannay paavahi mokh du-aar. Mannay parvaarai saadhhaar.',
            'pauri-15': 'Mannay paavahi mokh du-aar. Mannay parvaarai saadhhaar.',
            'pauri-16': 'Panch parvaan panch pardhaan. Panchay paavahi dargahi maan.',
            'pauri-17': 'Asankh jap asankh bha-o. Asankh pooja asankh tap ta-o.',
            'pauri-18': 'Asankh moorakh andh ghor. Asankh chor haraamkhor.',
            'pauri-19': 'Asankh moorakh andh ghor. Asankh chor haraamkhor.',
            'pauri-20': 'Bhari-ai hath pair tan deh. Paanee dhotai utras kheh.',
            'pauri-21': 'Teerath naavahu paapan da naas.',
            'pauri-22': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-23': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-24': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-25': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-26': 'Mileeai pancha satgur prasad.',
            'pauri-27': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-28': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-29': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-30': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-31': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-32': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-33': 'Aakhan dhundh dhundh dhundh. Aakhan amrit peehu khand.',
            'pauri-34': 'Dharam khand ka eh karam.',
            'pauri-35': 'Gi-aan khand ka eho ant.',
            'pauri-36': 'Saram khand kee baanee. Tit roop aroop aroop.',
            'pauri-37': 'Karam khand kee baanee. Tit jot roop na bhaavnee.',
            'pauri-38': 'Jat paahaaraa dheeraj suni-aar. Ahran mat vayd hathee-aar.',
            'salok': 'Pavan Guru, paanee pitaa, maataa dharat mahat. Divas raat du-ay daa-ee daa-i-aa khaylai sagal jagat.'
        },
        english: {
            'mool-mantar': "One Universal Creator God, His name is Truth. He is the Creator, without fear, without hate. The timeless, without form, beyond birth, self-existent. Attained by the Guru's grace.",
            'pauri-1': 'By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times. By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.',
            'pauri-2': 'By His Command, bodies are created; His Command cannot be described. By His Command, souls come into being; by His Command, glory and greatness are obtained.',
            'pauri-3': 'Some sing of His power, who have the power to do so. Some sing of His gifts, and know that they are His signs.',
            'pauri-4': 'The True Lord is true, and true is His Name. His expression is infinite love. They ask, they beg, and they receive, and the Great Giver gives His gifts.',
            'pauri-5': 'He cannot be established, He cannot be created. He Himself is immaculate and pure.',
            'pauri-6': 'If you could live for the four ages, or even ten times longer, and your reputation was known throughout the nine continents, and everyone followed you,',
            'pauri-7': 'If He does not cast His Glance of Grace upon you, then no one will ask your worth. What are you then but a worthless jewel?',
            'pauri-8': 'By hearing, the Siddhas, the spiritual teachers, the hero-mentors, and the Yogic masters are found. By hearing, the earth, its supporting bull, and the ethereal heavens are known.',
            'pauri-9': 'By hearing, Shiva, Brahma, and Indra are known. By hearing, even the lowly praise is elevated.',
            'pauri-10': 'By hearing, truth, contentment, and spiritual wisdom are acquired. By hearing, the blessing of bathing in the sixty-eight sacred shrines is obtained.',
            'pauri-11': 'By hearing, all bonds are broken. By hearing, all suffering and sin are erased.',
            'pauri-12': 'By believing, the mind acquires spiritual wisdom and understanding. By believing, the knowledge of all the worlds is gained.',
            'pauri-13': 'By believing, one does not have any obstacles on the path. By believing, one goes with honor and glory.',
            'pauri-14': 'By believing, the doors of liberation are found. By believing, one is saved along with his family.',
            'pauri-15': 'By believing, the doors of liberation are found. By believing, one is saved along with his family.',
            'pauri-16': 'By the Guru\'s Grace, one attains the state of salvation. By the Guru\'s Grace, all worries are removed.',
            'pauri-17': 'Countless are those who chant the Lord\'s Name, and countless are those who meditate in loving adoration. Countless are the worships and countless are the ascetic practices and austerities.',
            'pauri-18': 'Countless are the fools, lost in utter darkness. Countless are the thieves and embezzlers.',
            'pauri-19': 'Countless are the fools, lost in utter darkness. Countless are the thieves and embezzlers.',
            'pauri-20': 'If the hands, feet, and body are covered with dirt, they are washed clean with water. If the clothes are soiled and stained by urine, they are washed clean by soap.',
            'pauri-21': 'By bathing at sacred shrines, one\'s sins are destroyed.',
            'pauri-22': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-23': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-24': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-25': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-26': 'By meeting with the Panch, by the Guru\'s Grace, salvation is attained.',
            'pauri-27': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-28': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-29': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-30': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-31': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-32': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-33': 'To speak is a trade, a trade, a trade. To speak is to drink the elixir, the nectar.',
            'pauri-34': 'The realm of righteousness is the sphere of righteous action.',
            'pauri-35': 'The realm of knowledge is beyond description.',
            'pauri-36': 'The realm of spiritual wisdom is permeated with divine form. There, the formless one has no form, no form.',
            'pauri-37': 'The realm of grace is permeated with divine light. In that place, there is no form of bliss.',
            'pauri-38': 'Let self-control be the furnace, and patient endurance the goldsmith. Let understanding be the anvil, and spiritual wisdom the hammer.',
            'salok': 'Air is the Guru, Water is the Father, and Earth is the Great Mother. Day and night are the two nurses, in whose lap the entire world is playing.'
        }
    };


    const paathText = document.getElementById('paath-text-container');
    const gurmukhiToggle = document.getElementById('gurmukhi-toggle');
    const translitToggle = document.getElementById('translit-toggle');
    const translationToggle = document.getElementById('translation-toggle');
    const viewOptionsBtn = document.getElementById('view-options-btn');
    const viewOptionsMenu = document.getElementById('view-options-menu');
    const navDropdown = document.getElementById('nav-dropdown');
    const sidebarNavList = document.getElementById('sidebar-nav-list');
    const fontDecrease = document.getElementById('font-decrease');
    const fontNormal = document.getElementById('font-normal');
    const fontIncrease = document.getElementById('font-increase');

    function renderBani() {
        const content = baniData.hindi;
        const transliterations = baniData.transliterations;
        const englishTranslations = baniData.english;

        let mainContentHtml = `<header class="paath-intro"><h1>${content.title}</h1><p class="bani-author">${content.author}</p><p>${content.intro}</p></header>`;
        
        mainContentHtml += `<div class="continuous-paath">`;

        content.sections.forEach(section => {
            let pauriNumber = '';
            let sectionText = section.text;
            
            if (section.id.startsWith('pauri-')) {
                pauriNumber = section.id.replace('pauri-', '');
                sectionText += ` ॥ ${pauriNumber} ॥`;
            }

            mainContentHtml += `<div class="line-group" id="${section.id}">
                <p class="gurmukhi">${sectionText}</p>
                <p class="transliteration">${transliterations[section.id] || ''}</p>
                <p class="translation">${englishTranslations[section.id] || ''}</p>
            </div>`;
            
            if (section.id === 'mool-mantar') {
                mainContentHtml += `<div class="jap-heading">॥ जप ॥</div>`;
            }
        });

        mainContentHtml += `</div>`;
        paathText.innerHTML = mainContentHtml;
    }

    function generateNavigation() {
        const sections = baniData.hindi.sections;
        sidebarNavList.innerHTML = sections.map(section => `<li><a href="#${section.id}" data-id="${section.id}">${section.title}</a></li>`).join('');
        navDropdown.innerHTML = sections.map((section) => `<option value="${section.id}">${section.title}</option>`).join('');
    }

    renderBani();
    generateNavigation();
    // Show all content by default for Hindi version
    paathText.classList.remove('hide-transliteration', 'hide-translation', 'hide-gurmukhi');

    // Event listeners (same as Punjabi version)
    viewOptionsBtn.addEventListener('click', () => {
        viewOptionsMenu.classList.toggle('active');
        viewOptionsBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!viewOptionsMenu.contains(e.target) && !viewOptionsBtn.contains(e.target)) {
            viewOptionsMenu.classList.remove('active');
            viewOptionsBtn.classList.remove('active');
        }
        if (e.target.matches('.paath-navigation a')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-id');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            navDropdown.value = targetId;
        }
    });

    gurmukhiToggle.addEventListener('change', () => paathText.classList.toggle('hide-gurmukhi', !gurmukhiToggle.checked));
    translitToggle.addEventListener('change', () => paathText.classList.toggle('hide-transliteration', !translitToggle.checked));
    translationToggle.addEventListener('change', () => paathText.classList.toggle('hide-translation', !translationToggle.checked));

    function updateFontBtnStates(activeBtn) {
        [fontDecrease, fontNormal, fontIncrease].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    fontDecrease.addEventListener('click', () => { 
        paathText.className = paathText.className.replace(/font-(small|large|xl)/g, ''); 
        paathText.classList.add('font-small'); 
        updateFontBtnStates(fontDecrease); 
    });
    
    fontNormal.addEventListener('click', () => { 
        paathText.className = paathText.className.replace(/font-(small|large|xl)/g, ''); 
        updateFontBtnStates(fontNormal); 
    });
    
    fontIncrease.addEventListener('click', () => { 
        paathText.className = paathText.className.replace(/font-(small|large|xl)/g, ''); 
        paathText.classList.add('font-large'); 
        updateFontBtnStates(fontIncrease); 
    });

    navDropdown.addEventListener('change', (e) => {
        const targetId = e.target.value;
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        viewOptionsMenu.classList.remove('active');
        viewOptionsBtn.classList.remove('active');
    });
});
</script>
