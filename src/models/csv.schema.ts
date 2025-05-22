import mongoose, { Document, Schema } from 'mongoose';

export interface ICSVData extends Document {
  fileName: string;
  uploadDate: Date;
  data: Record<string, any>[];
  totalRows: number;
}

const CSVDataSchema: Schema = new Schema({
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  data: { type: Array, required: true },
  totalRows: { type: Number, required: true }
});

export default mongoose.model<ICSVData>('CSVData', CSVDataSchema); 