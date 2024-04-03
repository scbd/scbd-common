export const allPluginsConfig= {  
     toolbar: {
            items: ['heading', 'fontSize', 'fontColor', '|', 'bold', 'italic', 'link', '|',
            'indent', 'outdent', 'alignment', '|', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'highlight', 'insertTable', '|', 'imageInsert', 'mediaEmbed', '|', 'horizontalLine', '|',
            'removeFormat', 'undo', 'redo', '|', 'pageBreak'],
            shouldNotGroupWhenFull: true
        },
        alignment: { options: ['left', 'right', 'center', 'justify'] },
        fontColor: {
            colors: [
            { color: 'hsl(0, 0%, 0%)', label: 'Black' },
            { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
            { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
            { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
            { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true }
            ],
        },
        list: { properties: { styles: true, startIndex: true, reversed: true } },
        image: {
            styles: ['alignCenter', 'alignLeft', 'alignRight'],
            resizeOptions: [
                            { name: 'imageResize:original', label: 'Original', value: null },
                            { name: 'imageResize:25', label: '25%', value: '25' },
                            { name: 'imageResize:50', label: '50%', value: '50' },
                            { name: 'imageResize:75', label: '75%', value: '75' },
                            ],
            toolbar: ['imageTextAlternative', 'toggleImageCaption', '|',
                    'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                    'imageStyle:side', '|', 'resizeImage'],
            insert: { integrations: ['insertImageViaUrl'] },
        },
        heading: {
            options: [{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }],
        },
        fontSize: {
            options: [8, 10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption']
        },
        link: {
            addTargetToExternalLinks: false,
            defaultProtocol: 'https://',
            decorators: [
            { mode: 'manual', label: 'Downloadable', attributes: { download: 'download', }, },
            { mode: 'manual', label: 'Open in a new tab', attributes: { target: '_blank', rel: 'noopener noreferrer', }, },
            ],
        },
        mediaEmbed: {
            previewsInData: false,
            removeProviders: ['youtube'],
            extraProviders: [
            {
                name: 'youtubePlaylist',
                url: [/^youtube\.com\/embed\/videoseries\?list=([\w-]+)/],
                html: (match) => {
                const id = match[1]
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/videoseries?list=${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'youtube',
                url: [
                /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                /^youtube\.com\/embed\/([\w-]+)/,
                /^youtu\.be\/([\w-]+)/,
                ],
                html: (match) => {
                const id = match[1]
    
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                    `<iframe src="https://www.youtube.com/embed/${id}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                    '</iframe>' +
                    '</div>'
                )
                },
            },
            {
                name: 'customEmbed',
                url: [
                /cdn\.knightlab\.com\/libs\/timeline3\/.*/,
                /uploads\.knightlab\.com\/storymapjs\/.*/,
                /cdn\.knightlab\.com\/libs\/juxtapose\/.*/,
                /uploads\.knightlab\.com\/scenevr\/.*/,
                /cdn\.knightlab\.com\/libs\/storyline\/.*/,
                /theydrawit\.mucollective\.co\/vis\/.*/,
                /youtube\.com\/embed\/videoseries.*/,
                ],
                html: function (id) {
                return (
                    '<figure class="media">' + '	<oembed url="' + id.input + '">' +
                    '<a href="' + id.input + '">' + id.input + '</a>' + '	</oembed>' + '</figure>'
                )
                },
            },
            ],
        }      
}