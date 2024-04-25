import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Shortener, ShortenerDto } from "./shortener.entity";

@Injectable()
export class AppService {
  constructor(
    @Inject("SHORTENER_REPOSITORY")
    private shortenerRepository: Repository<Shortener>
  ) {}

  async createShortener({ url, short }: ShortenerDto): Promise<Shortener> {
    try {
      function gerarRandom(): string {
        const caracteres =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
        for (let i = 0; i < 12; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres.charAt(indice);
        }
        return resultado;
      }

      const generateShort = async () => {
        short = gerarRandom();

        const existingShortener = await this.shortenerRepository.findOne({
          where: { short },
        });

        if (existingShortener) {
          await generateShort();
        }
      };

      if (!short) {
        await generateShort();
      }

      console.log(`${short}`);

      if (!short) {
        throw new ForbiddenException();
      }

      const existingShortenerWithShort = await this.shortenerRepository.findOne(
        { where: {
          short
        } }
      );

      if(existingShortenerWithShort) {
        throw new ForbiddenException("Já existe um encurtador com esse código!");
      }

      const shortener = this.shortenerRepository.create({
        url,
        short
      });

      return await this.shortenerRepository.save(shortener);
    } catch (err) {
      throw err;
    }
  }

  async getShorneterByShort(short: string): Promise<Shortener> {
    try {
      return await this.shortenerRepository.findOne({
        where: {
          short,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
