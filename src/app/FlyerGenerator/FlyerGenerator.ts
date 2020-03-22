// @ts-ignore
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';


 const Dina4: { [id: string]: number } = {
    "width": 595,
    "height" : 842,
 };
 const margin = 100;


interface IResponse {
    error: boolean;
    data: any;
    message: string;
}

interface IParams {
    user: {
        email?: string;
        phoneNumber?: string;
        firstName?: string;
        lastName: string;
        userName?: string;
        picture?: string;
        verified?: boolean;
    }
    request?: {
        title: string;
        description: string;
    }
    category?: {
        name: string;
        description: string
    }
    offer?:{
        title: string;
        description: string;
    }
}

const FlyerGenerator = {
    helper_big: async (params:IParams):Promise<IResponse> => {
        const { user, request, category, offer } = params;
        const hash = createFileName();

        try {
            const filePath = path.resolve(hash + '.pdf');

            // Create a document
            let doc = new PDFDocument({size: 'A4'});

            // fill the pdf here!

            // Head
            doc.lineCap('butt')
                .strokeColor('#1C1C1C')
                .lineWidth(100)
                .moveTo(margin/2, margin/2+50)
                .lineTo(Dina4.width-margin/2,margin/2+50)
                .stroke()
            doc.image('./public/ressources/images/logo_light.png', margin, margin/2+10, {width: 180})

            // User picture (if)

            if ("picture" in user) {
                doc.image(user.picture, Dina4.width/2-50, 180, {fit: [100,100]})
            }

            doc.fontSize(12)
            doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Regular.ttf')
                .text(user.firstName+" "+user.lastName, margin, 200, {width: Dina4.width-(2*margin), align: 'right'})
                .moveDown(0.25)
                .text("Telefonnr.: "+user.phoneNumber, {width: Dina4.width-(2*margin), align: 'right'})

            doc.moveDown(3);

            doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Bold.ttf')
                .text(offer?.title, {align: 'justify'});

            doc.moveDown(1);


            doc.font('./public/ressources/fonts/Open_Sans/OpenSans-Regular.ttf')
                .text(offer?.description);

            doc.image('./public/ressources/images/qr_light.png', Dina4.width-margin-75, Dina4.height-margin-margin/2, {width: 100, align: 'right'})
            // doc.text("CoronaHelfer.eu", 0, Dina4.height-margin, {width: Dina4.width-(2*margin), align: 'right'})

            const result = await buildStream(doc, filePath);
            return { error: false, data: result, message: 'success!' };
        } catch (e) {
            console.log(e);
            return { error: true, data: null, message: e };
        }
    },
    helper_small: async (params:IParams):Promise<IResponse> => {
        const { user, request, category, offer } = params;
        const hash = createFileName();

        try {
            const filePath = path.resolve(hash + '.pdf');

            // Create a document
            let doc = new PDFDocument({size: 'A4'});

            // fill the pdf here!

            doc.strokeColor('#CCCCCC')
                .lineWidth(1)
                .dash(5, {space: 10})
                .moveTo(margin/2, Dina4.height/3)
                .lineTo(Dina4.width-margin/2, Dina4.height/3)
                .stroke()
                .undash()

            doc.strokeColor('#CCCCCC')
                .lineWidth(1)
                .dash(5, {space: 10})
                .moveTo(margin/2, Dina4.height/3*2)
                .lineTo(Dina4.width-margin/2, Dina4.height/3*2)
                .stroke()
                .undash()

            let angle = 90;

            // erstes Feld
            let x = margin/2;
            let y = Dina4.height-margin/2;

            for (let i=0; i<=2; i++){

            x = margin/2;
            y = Dina4.height-margin/2-(i*Dina4.height/3);

            doc.rotate(angle * (-1), { origin: [x,y] });
            doc.lineCap('butt')
                .strokeColor('#1C1C1C')
                .lineWidth(30)
                .moveTo(x, y+15)
                .lineTo(x+Dina4.height/3-margin,y+15)
                .stroke()
            doc.image('./public/ressources/images/logo_light.png', x+10, y+2, {height: 26})
            doc.rotate(angle, { origin: [x,y] });
            }

            const result = await buildStream(doc, filePath);
            return { error: false, data: result, message: 'success!' };
        } catch (e) {
            console.log(e);
            return { error: true, data: null, message: e };
        }
    },
};

const createFileName = async (): Promise<string> => {
    const date = new Date(Date.now()).getTime();

    return await bcrypt.hash(date.toString(), 10);
};

const buildStream = async (doc: any, filePath: string) => {
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Finalize PDF file
    doc.end();

    const promiseFn = () => {
        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                const result = fs.readFileSync(filePath, {encoding: 'binary'});

                fs.unlinkSync(filePath);

                resolve(result);
            });
        });
    };

    return await promiseFn();
};

// @ts-ignore
export default FlyerGenerator;
