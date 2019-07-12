import { TypeC } from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

export function validate(codec: TypeC<any>, u: unknown): void {
  const validation = codec.decode(u);
  if (validation._tag === 'Left') {
    const result = PathReporter.report(validation);
    throw Error(result.toString());
  }
}

export function validateMore(codecs: TypeC<any>[], u: unknown): void {
  for (const codec of codecs) {
    validate(codec, u);
  }
}
